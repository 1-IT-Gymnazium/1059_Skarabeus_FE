'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">
                        <img alt="" class="img-responsive" data-type="custom-logo" data-src="images/skarabeus_logo_small.png">
                    </a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ChangePasswordPageComponent.html" data-type="entity-link" >ChangePasswordPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DefaultComponent.html" data-type="entity-link" >DefaultComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DishListComponent.html" data-type="entity-link" >DishListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EventListComponent.html" data-type="entity-link" >EventListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FoodPageComponent.html" data-type="entity-link" >FoodPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HomePageComponent.html" data-type="entity-link" >HomePageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoginPageComponent.html" data-type="entity-link" >LoginPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NotFoundPageComponent.html" data-type="entity-link" >NotFoundPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PeoplePageComponent.html" data-type="entity-link" >PeoplePageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PersonsListComponent.html" data-type="entity-link" >PersonsListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserInfoPageComponent.html" data-type="entity-link" >UserInfoPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserListComponent.html" data-type="entity-link" >UserListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ValidateEmailPageComponent.html" data-type="entity-link" >ValidateEmailPageComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DishService.html" data-type="entity-link" >DishService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EditService.html" data-type="entity-link" >EditService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EventService.html" data-type="entity-link" >EventService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IngredientService.html" data-type="entity-link" >IngredientService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PersonService.html" data-type="entity-link" >PersonService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/DishAddIngredientModel.html" data-type="entity-link" >DishAddIngredientModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DishCreate.html" data-type="entity-link" >DishCreate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DishDetail.html" data-type="entity-link" >DishDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DishIngredientModel.html" data-type="entity-link" >DishIngredientModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EventCreateModel.html" data-type="entity-link" >EventCreateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EventDetailModel.html" data-type="entity-link" >EventDetailModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IngredientCreate.html" data-type="entity-link" >IngredientCreate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IngredientDetail.html" data-type="entity-link" >IngredientDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IngredientDishDetail.html" data-type="entity-link" >IngredientDishDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginModel.html" data-type="entity-link" >LoginModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PasswordResetModel.html" data-type="entity-link" >PasswordResetModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PersonCreateModel.html" data-type="entity-link" >PersonCreateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PersonDetailModel.html" data-type="entity-link" >PersonDetailModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SmallPersonDetailModel.html" data-type="entity-link" >SmallPersonDetailModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TokenModel.html" data-type="entity-link" >TokenModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserCreate.html" data-type="entity-link" >UserCreate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserDetail.html" data-type="entity-link" >UserDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserPatch.html" data-type="entity-link" >UserPatch</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#pipes-links"' :
                                'data-bs-target="#xs-pipes-links"' }>
                                <span class="icon ion-md-add"></span>
                                <span>Pipes</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="pipes-links"' : 'id="xs-pipes-links"' }>
                                <li class="link">
                                    <a href="pipes/EventPipe.html" data-type="entity-link" >EventPipe</a>
                                </li>
                                <li class="link">
                                    <a href="pipes/PersonPipe.html" data-type="entity-link" >PersonPipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});