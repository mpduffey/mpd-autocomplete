angular.module('mpd.autocomplete', [])
.directive('mpdAutocomplete', function(){
	return {
		require:	'ngModel',
		link:		function($scope, $element, $attrs, ngModel) {
						ngModel.$render = function() {
							$element.val(ngModel.$viewValue || '');
						};
						$element.autocomplete({
							autoFocus:		$attrs.autoFocus || true,
							delay:			$attrs.delay || false,
							disabled:		$attrs.autocompleteDisabled || false,
							minLength:		$attrs.minLength || 3,
							source:			$attrs.source,
							select:			$attrs.select || function(ev, ui) {
								$scope.$apply(function() {
									ngModel.$setViewValue(ui.item.value);
								});
							}
						});
		}
	};
});