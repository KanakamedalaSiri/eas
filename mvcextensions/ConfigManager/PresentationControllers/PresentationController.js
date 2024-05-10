define([], function() {

    function PresentationController() {
        voltmx.mvc.Presentation.BasePresenter.call(this);
    }

    inheritsFrom(PresentationController, voltmx.mvc.Presentation.BasePresenter);

    PresentationController.prototype.initializePresentationController = function() {
        
    };

    return PresentationController;
});