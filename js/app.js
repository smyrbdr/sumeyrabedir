/*

For this quiz, can you use this script, which is linked in the <head> of index.html,
to add a new project into my portfolio website.

Remember, you'll need to pass a function into the jQuery object to run
when the document is ready.



*/


// creates an html script for the new project card
function createprojHTML(project) {
    const projHTML = `
    			<div class="col-md-3 col-md-push-1 project-imgs">
    				<img class="img-responsive" src="https://github.com/smyrbdr/${project.reponame}/blob/master/featured_image.jpg?raw=true" alt="Project${project.projnum} Image" data-toggle="modal" data-target="#project${project.projnum}">
					<h3 class="text-uppercase">Project ${project.projnum}</h3>
					<p class="text-image">Click the above image for details</p>
				</div>
	`;

	const modalHTML = `
	
	<!-- Modal -->
    <div class="modal fade" id="project${project.projnum}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel${project.projnum}" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel${project.projnum}">About Project ${project.projnum}</h4>
                </div>
                <div class="modal-body">
                    <img class="img-responsive" src="https://github.com/smyrbdr/${project.reponame}/blob/master/featured_image.jpg?raw=true" alt="project image">
                    ${project.description}
                </div>
                <div class="modal-footer">
                	<button type="button" class="btn btn-primary" onclick="javascript:window.location.href='https://github.com/smyrbdr/${project.reponame}';">Visit Project</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    `;
    return [projHTML, modalHTML];
}

function addproject() {
	const newproject = {
    projnum: prompt("Type the number of the new project"),
    reponame: prompt("Type the name of GitHub project repo"),
    description: prompt("Write a description for the new project")
};

	document.getElementById("projectsmaindiv").innerHTML += createprojHTML(newproject)[0];

	document.body.innerHTML += createprojHTML(newproject)[1];

};



function saveproject() {	
	const state = "<pre>" + document.documentElement.outerHTML.replace(/</g,"&lt;") + "</pre>"
	document.getElementById("finallysave").innerHTML += state;
};

