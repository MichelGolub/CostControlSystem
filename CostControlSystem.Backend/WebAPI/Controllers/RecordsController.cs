using Application.Features.Records.Commands.CreateRecord;
using Application.Features.Records.Commands.DeleteRecord;
using Application.Features.Records.Commands.UpdateRecord;
using Application.Features.Records.Queries.GetRecordDetails;
using Application.Features.Records.Queries.GetRecordsList;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models.Records;

namespace WebApi.Controllers
{
    public class RecordsController : BaseController
    {
        private readonly IMapper _mapper;

        public RecordsController(IMapper mapper) => _mapper = mapper;

        [HttpGet("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<RecordDetailsVm>> Get(Guid id)
        {
            var query = new GetRecordDetailsQuery
            {
                UserId = UserId,
                Id = id
            };
            var vm = await Mediator.Send(query);
            return Ok(vm);
        }

        [HttpGet]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<IList<RecordLookupDto>>> GetAll([FromQuery] Guid budgetAccountId)
        {
            var query = new GetRecordsListQuery
            {
                UserId = UserId,
                BudgetAccountId = budgetAccountId
            };
            var vm = await Mediator.Send(query);
            return Ok(vm);
        }

        [HttpPost]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<Guid>> Create([FromBody] CreateRecordDto createRecordDto)
        {
            var command = _mapper.Map<CreateRecordCommand>(createRecordDto);
            command.UserId = UserId;
            var noteId = await Mediator.Send(command);
            return Ok(noteId);
        }

        [HttpPut("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Update
            (Guid id, [FromBody] UpdateRecordDto updateRecordDto)
        {
            if (updateRecordDto.Id != id)
            {
                return Conflict();
            }
            var command = _mapper.Map<UpdateRecordCommand>(updateRecordDto);
            command.UserId = UserId;
            await Mediator.Send(command);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Delete(Guid id)
        {
            var command = new DeleteRecordCommand
            {
                Id = id,
                UserId = UserId
            };
            await Mediator.Send(command);
            return NoContent();
        }
    }
}
