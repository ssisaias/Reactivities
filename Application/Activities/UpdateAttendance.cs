using System;
using Application.Core;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Domain;

namespace Application.Activities
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }
    }

    public class Handler : IRequestHandler<UpdateAttendance.Command, Result<Unit>>
    {
        private readonly IUserAccessor _userAccessor;
        private readonly DataContext _context;
        public Handler(DataContext context, IUserAccessor userAccessor)
        {
            this._context = context;
            this._userAccessor = userAccessor;
        }

        public async Task<Result<Unit>> Handle(UpdateAttendance.Command request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities
                .Include(a => a.Attendees).ThenInclude(u => u.AppUser)
                .FirstOrDefaultAsync(x => x.Id == request.Id);
            
            if (activity == null) return null; //returns 404

            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

            if(user == null) return null; // returns 404

            var hostUserName = activity.Attendees.FirstOrDefault(x => x.IsHost)?.AppUser?.UserName;

            var attendance = activity.Attendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

            if(attendance != null && hostUserName == user.UserName) {
                activity.IsCancelled = !activity.IsCancelled;
            }

            if(attendance != null && hostUserName != user.UserName) {
                activity.Attendees.Remove(attendance);
            }

            if(attendance == null) {
                attendance = new ActivityAttendee {
                    AppUser = user,
                    Activity = activity,
                    IsHost = false
                };

                activity.Attendees.Add(attendance);
            }

            var result = await _context.SaveChangesAsync() > 0;

            return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating attendance");
        }
    }
}