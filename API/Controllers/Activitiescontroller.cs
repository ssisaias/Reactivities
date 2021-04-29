using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    public class Activitiescontroller : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> getActivities()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")] //activites//id
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }
    }
}