using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class Activitiescontroller : BaseApiController
    {
        private readonly DataContext _context;
        public Activitiescontroller(DataContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> getActivities(){
            return await _context.Activities.ToListAsync();
        }

        [HttpGet("{id}")] //activites//id
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await _context.Activities.FindAsync(id);
        }
    }
}