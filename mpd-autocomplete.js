angular.module('mpd.autocomplete', [])
.directive('mpdAutocomplete', function(){
	return {
		require: 'ngModel',
			link: function($scope, $element, $attrs, ngModel) {
				ngModel.$render = function() {
					$element.val(ngModel.$viewValue || '');
				};
				$element.autocomplete({
					autoFocus: $attrs.autoFocus || true,
					delay: $attrs.delay || false,
					disabled: $attrs.autocompleteDisabled || false,
					minLength: $attrs.minLength || 3,
					source: function(req, res) {
						res($.map($scope[$attrs.source].data, function(item) {
							if (item.ObjectName.toLowerCase().indexOf(req.term.toLowerCase()) > -1) {
								return {
									label: item.ObjectName,
									value: item.ObjectID
								};
							}
						}))
					},
					select: $attrs.select || function(ev, ui) {
							ngModel.$setViewValue(ui.item.label);
					},
					focus: $attrs.focus || function(ev, ui) {
						$scope.$apply(function() {
							ngModel.$setViewValue(ui.item.label);
						});
					}
				});
			}
	};
});