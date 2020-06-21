function startEditor () {
	// Defaults to
	ContentTools.DEFAULT_TOOLS = [['bold','italic','link'], 
		['heading','subheading','paragraph','unordered-list','ordered-list','table','indent','unindent'], 
		['video','preformatted'], 
		['undo','redo','remove']
	]
	var editor;
	editor = ContentTools.EditorApp.get ();
	editor.init ("*[data-editable]", "data-name");
}

	

	