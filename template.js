//<nowiki>
var uTemplate = [
	'Uw-vandalism1',
	'Uw-vandalism2',
    'Uw-vandalism3',
    'Uw-vandalism4',
    'Uw-vandalism4im',
    'Uw-test1',
    'Uw-test2',
    'Uw-test3',
    'Uw-test4',
    'Uw-generic4',
    'Oh Dear',
];
 
// Text to be shown in Toolbox
var uText = [
	"Vandalism - level 1",
	"Vandalism - level 2",
	"Vandalism - level 3",
    "Vandalism - level 4",
    "Vandalism - only warning",
    "Test edits - level 1",
    "Test edits - level 2",
    "Test edits - level 3",
    "Test edits - level 4",
    "Generic level 4 warning",
    "Oh dear...",
];

// Mouseover help text for Toolbox
var uHelp = [
	"Warn user",
	"Warn user",
	"Warn user",
	"Warn user",
	"Warn user",
	"Warn user",
	"Warn user",
	"Warn user",
	"Warn user",
	"Warn user",
    "Warn, and also welcome, user",
];

// Add the template
function template_mark(talkpage_fakeaction) {
	var editlk = document.getElementById('ca-edit').getElementsByTagName('a')[0].href;
	document.location = editlk + '&templateaction=' + talkpage_fakeaction;
}
 
// Add template to user talk page
function template_addTemplate(template) {
	var txt = '{{safesubst:' + template + '}}';
	document.editform.wpTextbox1.value = document.editform.wpTextbox1.value + '\n' + txt + '\n~~\~~';
	//  the edit summary for when you mark the image. You can change it if you want.
	document.editform.wpSummary.value = 'Warning user (using [[User:JJPMaster/easyTemplate|easyTemplate.js]]';
	if (template_autosave) document.editform.wpSave.click();
}

function makeVectorFancySection()  {
	//wrap this in a try. this might be somewhat delicate at the moment.
	var pNotify = document.createElement('div');
	pNotify.id = 'p-Notify';
	pNotify.className = 'vectorMenu';
	pNotify.innerHTML = ' <h3><span>Warn</span><a href="#"></a></h3> <div class="menu"> <ul> </ul> </div>';
	var rightNav = document.getElementById('right-navigation');
	var pViews = document.getElementById('p-views');
	pViewsCont = document.createElement('div');
	pViewsCont.id = 'p-views-continued';
	pViewsCont.className = 'vectorTabs';
	var pViewsUL = document.createElement('ul');
	pViewsCont.appendChild(pViewsUL);
	var pivot = (document.getElementById('ca-history') ? document.getElementById('ca-history') : document.getElementById('ca-addsection'));
	pivot = (pivot ? pivot : document.getElementById('ca-edit'));
	pViewsUL.appendChild(pivot);
	rightNav.insertBefore(pNotify, pViews.nextSibling);
	rightNav.insertBefore(pViewsCont, pNotify.nextSibling); 
}
 
// Add the menu, or add the template to the edit page
function template_onload() {
    try {
    if (mw.config.get('skin') === 'vector') {
        if (window.useFancyVectorDropdown || window.useFancyVectorDropdown === undefined) {
            try {
                makeVectorFancySection();
                useFancyVectorDropdown = 'done'; //this is for debug. can remove
            }
            catch (e) {
                document.getElementById('panel').innerHTML += '<div id="p-Notify" class="portal"><h3 lang="en" xml:lang="en">Warn</h3><div class="body">\n <ul> </ul> </div> </div>';
            }
        }
        else {
            document.getElementById('panel').innerHTML += '<div id="p-Notify" class="portal"><h3 lang="en" xml:lang="en">Warn</h3><div class="body">\n <ul> </ul> </div> </div>';
       }
    } else if (mw.config.get('skin') === 'monobook') {
        document.getElementById('column-one').innerHTML += '<div id="p-Notify" class="portlet"> <h3 lang="en" xml:lang="en">Warn</h3> <div class="pBody">	<ul></ul></div>	</div>';
    }
    } catch (e) {} //ignore errors and just use tb if they happen.
    var portlet = (document.getElementById('p-Notify') ? 'p-Notify' : 'p-tb');
 
    for( var i = 0; i < uText.length; i++ ) {
	    var node = mw.util.addPortletLink(portlet, '', uText[i], 'mark-warn', uHelp[i], null, null);
	    $( node ).click( { template_idx: i }, function(e) {
	    	e.preventDefault();
	    	template_mark( e.data.template_idx );	
	    } );
    }
    var action_idx = -1;
	try {
		action_idx = parseInt (mw.util.getParamValue('templateaction'), 10);
	} catch (some_error) {
		action_idx = -1;    
	}
	if ( uTemplate[ action_idx ] !== undefined ) {
		//may i take this moment to mention, this script is very very confusing
		if ( mw.config.get( 'wgNamespaceNumber' ) !== 3 ) { 
			alert("The user warning script has been disabled in this namespace for security reasons.");
			throw new Error("Security error: wrong namespace for user warning script.");
		}
		template_addTemplate( uTemplate[ action_idx ] );
	}
}
 
// NS_USERTALK
if (
	mw.config.get('wgNamespaceNumber') === 3
	&& mw.config.get( 'wgPageContentModel' ) === 'wikitext'
) {
	// Load dependencies and wait for page to be ready
	$.when( mw.loader.using( [ 'mediawiki.util' ] ), $.ready )
		.done( template_onload );
}

//</nowiki>
