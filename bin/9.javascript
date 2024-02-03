var ActionStep_Form = {
    
    _allowExit  : true,
    _disableMask: false,
    enableExitWarnings: true,
    
    init: function() {
        ActionStep_Form._initSubFormsList();
        ActionStep_Form._initErrors();
        ActionStep_Form._initSubmission();
        ActionStep_Form._initExitConditions();
        ActionStep_Form._initFormFocus();

        jQuery(document).trigger('initialized.Actionstep_Form');
    },

    _initErrors: function() {
        jQuery('.as-form').on('click', '.js-field-error-close', function(e) {
            jQuery(this).closest('ul.as-field-errors').remove();
        });

        jQuery('.as-form').on('click', '.js-form-errors-close', function(e) {
            jQuery(this).closest('ul.as-form-errors').remove();
        });
    },
            
    _initSubmission: function() {
        var self = ActionStep_Form;
        jQuery('form.as-form').on('submit', function(e) {
            if (self._validateForm() === true) {
                self.allowExit();
                self.showMask();
                return true;
            } else {
                e.preventDefault();
                return false;
            }
        });
    },
        
    _initSubFormsList: function() {
        // delete row
        jQuery(document).on('click', ".js-subform-remove", function(e) {
            jQuery(this).closest("tr").remove();
        });
        
        jQuery(".js-subform-add-line").on('click', function(e) {
            var tbody        = jQuery(this).closest("table").find("tbody:last");
            var formName     = jQuery(this).attr("data-form-name");
            var belongsTo    = ((jQuery(this).attr("name") === 'AddRow') ? '' : jQuery(this).attr("name").replace("[AddRow]", ""));
            var nextRowIndex = parseInt(jQuery(this).attr("data-next-row-index"));
            
            if (isNaN(nextRowIndex)) {
                nextRowIndex = 1000; // start high
            }
            
            jQuery(this).attr("data-next-row-index", (nextRowIndex + 1));
            
            jQuery.ajax({
                url : location.href,
                data: {
                    'x-subform-name'        : formName,
                    'x-subform-index'       : nextRowIndex,
                    'x-subform-belongs-to'  : belongsTo
                },
                success: function(data) {
                    tbody.append(data);
                }
            });
        });
    },
    
    _initExitConditions: function() {
        window.onbeforeunload = function() {
            if (ActionStep_Form.enableExitWarnings === true && ActionStep_Form._allowExit === false) {
                return 'Leave page without saving changes?';
            }
        };
        
        jQuery('form.as-form').on('change', 'input[name],textarea[name],select[name]', function () {
            ActionStep_Form._allowExit = false; 
        });
    },
            
    _initFormFocus: function() {
        jQuery('.cs-page-wrapper form:first').find('input,textarea,select,button').first().focus();
    },
    
    _validateForm: function() {
        var event = jQuery.Event('validate');
        jQuery('.as-form').trigger(event);
        if (event.result === false || event.isDefaultPrevented() === true) {
            return false;
        } else {
            return true;
        }
    },
    
    allowExit: function(){
        ActionStep_Form._allowExit = true;
    },
    
    showMask: function() {
        if (ActionStep_Form._disableMask === false) {
            jQuery('<div class="as-mask">').css({
                position: 'absolute',
                top     : 0,
                bottom  : 0,
                left    : 0,
                right   : 0
            }).appendTo('body').show();
            jQuery('.cs-page-wrapper')
                .addClass('is-submitted');
                // .css('opacity', '0.5');
        }
    },

    hideMask: function() {
        jQuery('.as-mask').remove();
        jQuery('.cs-page-wrapper').css('opacity', '1');
    }
};

jQuery(window).ready(ActionStep_Form.init);