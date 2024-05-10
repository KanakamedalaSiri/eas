define([], function() {

    var currentScope = null;

    function PresentationController() {
        voltmx.mvc.Presentation.BasePresenter.call(this);
        currentScope = this;
    }

    inheritsFrom(PresentationController, voltmx.mvc.Presentation.BasePresenter);

    PresentationController.prototype.initializePresentationController = function() {

    };

    return PresentationController;
});