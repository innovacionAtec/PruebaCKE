﻿var wrs_int_opener;
var closeFunction;

if (window.opener) {							// For popup mode.
	wrs_int_opener = window.opener;
	closeFunction = window.close;
}
/* FCKeditor integration begin */
else {											// For iframe mode.
	wrs_int_opener = window.parent;
	
	while (wrs_int_opener.InnerDialogLoaded) {
		wrs_int_opener = wrs_int_opener.parent;
	}
}

if (window.parent.InnerDialogLoaded) {			// iframe mode.
	window.parent.InnerDialogLoaded();
	closeFunction = window.parent.Cancel;
}
else if (window.opener.parent.FCKeditorAPI) {	// popup mode.
	wrs_int_opener = window.opener.parent;
}
/* FCKeditor integration end */

wrs_int_opener.wrs_addEvent(window, 'load', function () {
	var applet = document.getElementById('applet');
	
	// Mathml content.
	if (!wrs_int_opener._wrs_isNewElement) {
		var mathml;
		
		if (wrs_int_opener._wrs_conf_useDigestInsteadOfMathml) {
			mathml = wrs_int_opener.wrs_getCode(wrs_int_opener._wrs_conf_digestPostVariable, wrs_int_opener._wrs_temporalImage.getAttribute(wrs_int_opener._wrs_conf_imageMathmlAttribute));
		}
		else {
			mathml = wrs_int_opener.wrs_mathmlDecode(wrs_int_opener._wrs_temporalImage.getAttribute(wrs_int_opener._wrs_conf_imageMathmlAttribute));
		}
		
		function setAppletMathml() {
			// Internet explorer fails on "applet.isActive". It only supports "applet.isActive()".
			
			try {
				if (applet.isActive()) {
					applet.setContent(mathml);
				}
				else {
					setTimeout(setAppletMathml, 50);
				}
			}
			catch (e) {
				setTimeout(setAppletMathml, 50);
			}
		}

		setAppletMathml();
	}
	
	// Submit button.
	var controls = document.getElementById('controls');
	var submitButton = document.createElement('input');
	submitButton.type = 'button';
	submitButton.value = 'Accept';
	
	wrs_int_opener.wrs_addEvent(submitButton, 'click', function () {
		var mathml = '';
	
		if (!applet.isFormulaEmpty()) {
			mathml += applet.getContent();							// If isn't empty, get mathml code to mathml variable.
			mathml = wrs_int_opener.wrs_mathmlEntities(mathml);		// Apply a parse.
		}
		
		/* FCKeditor integration begin */
		if (window.parent.InnerDialogLoaded && window.parent.FCKBrowserInfo.IsIE) {			// On IE, we must close the dialog for push the caret on the correct position.
			closeFunction();
			wrs_int_opener.wrs_int_updateFormula(mathml, wrs_int_opener._wrs_editMode);
		}
		/* FCKeditor integration end */
		else {
			if (wrs_int_opener.wrs_int_updateFormula) {
				wrs_int_opener.wrs_int_updateFormula(mathml, wrs_int_opener._wrs_editMode);
			}
			
			closeFunction();
		}
	});
	
	controls.appendChild(submitButton);

	// Cancel button.
	var cancelButton = document.createElement('input');
	cancelButton.type = 'button';
	cancelButton.value = 'Cancel';
	
	wrs_int_opener.wrs_addEvent(cancelButton, 'click', function () {
		closeFunction();
	});
	
	controls.appendChild(cancelButton);
	
	// Auto resizing.
	
	setInterval(function () {
		applet.style.height = (document.getElementById('container').offsetHeight - controls.offsetHeight - 10) + 'px';
	}, 100);
});

wrs_int_opener.wrs_addEvent(window, 'unload', function () {
	wrs_int_opener.wrs_int_notifyWindowClosed();
});
