using Application.Features.Categories.Commands.CreateCategory;
using Application.Features.Categories.Commands.DeleteCategory;
using Application.Features.Categories.Commands.UpdateCategory;
using Application.Features.Categories.Queries.GetCategoryDetails;
using Application.Features.Categories.Queries.GetCategoriesList;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models.Categories;

namespace WebApi.Controllers
{
    public class CategoriesController : BaseController
    {
        private readonly IMapper _mapper;

        public CategoriesController(IMapper mapper) => 
            _mapper = mapper;

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<GetCategoryDetailsVm>> Get(Guid id)
        {
            var query = new GetCategoryDetailsQuery
            {
                Id = id
            };
            var vm = await Mediator.Send(query);
            return Ok(vm);
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<IList<CategoryDto>>> GetAllByBudgetAccount
            ([FromQuery]Guid budgetAccountId)
        {
            var query = new GetCategoriesListQuery
            {
                BudgetAccountId = budgetAccountId
            };
            var vm = await Mediator.Send(query);
            return Ok(vm);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<Guid>> Create
            ([FromBody] CreateCategoryDto createCategoryDto)
        {
            var command = _mapper.Map<CreateCategoryCommand>(createCategoryDto);
            var categoryId = await Mediator.Send(command);
            return Ok(categoryId);
        }

        [HttpPut ("Update")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult> Update([FromBody] UpdateCategoryDto updateRecordDto)
        {
            var command = _mapper.Map<UpdateCategoryCommand>(updateRecordDto);
            await Mediator.Send(command);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Delete(Guid id)
        {
            var command = new DeleteCategoryCommand
            {
                Id = id
            };
            await Mediator.Send(command);
            return NoContent();
        }
    }
}


