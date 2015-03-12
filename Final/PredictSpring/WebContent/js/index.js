			
			$(document).ready(function() {
				var app = {};
				 app.dragSource = "",app.dragTarget="";

				app.initialize = function(){
					
					/* Storing The reference to Layout Cell.
					This is because Each Time the User Select's New Layout Cell, We donot have to traverse the Dom.
					We can just Clone This instance !*/
					app.newLayoutCell = app.getLayoutCellReference();
					console.log("Initialized...");
				}
				
				
				app.dragStart = function(e){
					var draggedId;
					console.log("start");
					var dataTransfer = e.originalEvent.dataTransfer;
					dataTransfer.effectAllowed = 'copy';
					app.dragSource = this;
					console.log("Source");
					console.log(app.dragSource);
					$(app.dragSource).find('img').attr('src') == null || undefined ? draggedId =  "" : draggedId = $(app.dragSource).find('img').attr('src');
					dataTransfer.setData('Text', draggedId);
					event.stopPropagation();
					return false;
					/* Two things cans be dragged.
					1. The pallet Cell Image to Layout Cell
					2. The layout Cell Themselves.
							During Scenario 2, The Dom Elements Wont have an Image Element.
							Hence we need to test if the source is because of scenario One or two*/
						}

						app.dragEnd = function(e){
							console.log("dragEnd");
							console.log(e.currentTarget);
							event.preventDefault();
							event.dataTransfer.dropEffect = 'copy';
							event.stopPropagation();
							return false;
						}

						app.dragOver = function(e){
							e.preventDefault();
						}

						app.dragEnter = function(e){
							console.log("dragEnter");
							app.dragTarget = e.currentTarget;
							console.log("target");
							console.log(app.dragTarget);
							e.preventDefault();
							return false;
						}

				/*THis function is just used to test if the Element Calling this function does have a child or not.
				THis method is mostly called using call and apply.*/	
				app.isChildAbsent = function(){
					if($(this).find('img').attr('src') == undefined){
						return true;
					}
					return false;
				}

				/*Again this utility is used to create Image Tag as described by the two scenarios.*/	
				app.createImgTag = function(){

					if($(this).find('img').length > 0){
						$(this).find('img').addClass('layoutCellImage');
						return;
					}else{
						var that = this;
						var img = $('<img>')[0];
						img.setAttribute('src',null);
						img.setAttribute('class','layoutCellImage');
						$(that).appendChild(img);
					}

				}

				/*Finally When you drop the Element, As Described above, The 2 scenario's repeat.
				i.e the source can be 
					1. The pallet Cell Image to Layout Cell
					2. The layout Cell Themselves.
					
					Scenario 2 Further Gives raise to 2 scenario
							2.a) If the souce is empty and target has an image
							2.b) If the Source has an image and target is empty

					Hence there are 4 cases in general. To avoid handling all the permutation/combination,
					The approach folllowed is:
							1. Check if SOurce is Empty- If Yes Create Img Tag in it But dont add src
							2. Check if Target is Empty- If Yes Create Img Tag in it But dont add src

							Then handle adding src attribute to the appropriate img tag	
							*/	
							app.newDrop = function(e){
								app.dragTarget = e.currentTarget;
								console.log("drop");
								var event = e.originalEvent;
								if (event.stopPropagation) {
									event.stopPropagation();
								}

								var isappDragSourceChildAbsent = false , isappDragTargetChildAbsent = false;
								isappDragSourceChildAbsent = app.isChildAbsent.call(app.dragSource);
								isappDragTargetChildAbsent = app.isChildAbsent.call(app.dragTarget);

								var dataTransfer = event.dataTransfer;
								var draggedId = dataTransfer.getData('Text');

								if(isappDragSourceChildAbsent && isappDragTargetChildAbsent){
									console.log("source and target is empty");

								}else{
									if(isappDragTargetChildAbsent){
										console.log("target child is absent");
										app.createImgTag.call(app.dragTarget);
									}
									if(isappDragSourceChildAbsent){
										console.log("source child is absent");
										app.createImgTag.call(app.dragSource,app.dragTarget)
									}
									if( app.dragSource.classList.contains('palletCell')){
										var appdragSourceURL= $(app.dragSource).find('img').attr('src');
										$(app.dragTarget).find('img').attr('src', appdragSourceURL);
									}else{
							//we need to swap the contents
							var temp = $(app.dragTarget).find('img').attr('src');
							$(app.dragTarget).find('img').attr('src',$(app.dragSource).find('img').attr('src'));
							$(app.dragSource).find('img').attr('src',temp);

							//however if app.dragSource itself is empty, then src attribute of image will point to index.html
							//hence remove the src Attribute
							//but just previously we swapped source with target.
							//so drop target(which was dropSource before swap) src needs to be removed
							if(isappDragSourceChildAbsent){
								console.log("remove source");
								$(app.dragTarget).find('div :first-child').removeAttr('src');
							}

							if(isappDragTargetChildAbsent){
								console.log("remove source");
								$(app.dragSource).find('div :first-child').removeAttr('src');
							}
						}

					}

					console.log("drop");
					e.stopPropagation();
					return false;
				}

				/* THis Utility Stores the Layout Cell Reference called by Initialize Function.*/	
				app.getLayoutCellReference = function(){
					var newItem = $('.layoutArea').find('tbody :first-child')[0];
					return $(newItem).clone(true)[0];
				}




				app.addLayoutCell = function(event){
				/*Just append the first Child Element That's stored as a reference.
				This avoids having to trverse the dom every time you need to add a new LayoutCell*/
				var newCell = $(app.newLayoutCell).clone(true)[0];
				$('.layoutArea')[0].appendChild(newCell);
			}

			/*This Function Is called Once you save the Layout.*/
			app.newOptionAdded = function(optionName){
				if(optionName.length != 0){
					$selectElement = $('#loadLayouts')[0];
					var newOption = $('<option>')[0];
					newOption.setAttribute('data-fileName',optionName);
					newOption.innerText = optionName;
					$selectElement.appendChild(newOption);
				}
			}

			app.isSaveFileNamePresent = function(name){
				console.log("'option[data-fileName='+name+']'");
				if($('option[data-fileName='+name+']').length >0){
					return true;
				}
				return false;
			}

			/*THis is called on Success CallBack of Ajax Call, once you retrieve the file Contents to load the content.*/	
			app.clearLayoutArea = function(){
				$('.layoutArea')[0].innerHTML = "";
			}

			app.loadLayoutArea = function(content){
				$('.layoutArea')[0].innerHTML = content;
			}

			/*To Be reused by both Success And Error Message. But I found It easier To create another Modal for Error.
			Reuseing will need a lot of change to innerHTML for eachAjax Call.*/	
			/*app.generateModalBody = function(glyphiconClass, MessageToDisplay){
				var modalContent = $("#Success-Modal .modal-body");
				Remove the previous class and add new Class
				$(modalContent).find('h3 i')[0].attributes.class = glyphiconClass;
				$(modalContent).find('h3')[0].innerText = MessageToDisplay;

			}*/



			app.loadLayout = function(event){
				var layoutToLoad = $("#loadLayouts :selected")[0].value.trim();
				$.ajax({
					url:'loadAction',
					type: 'POST',
					data: { "action": "load" , "loadLayout" : layoutToLoad},
					success: function (data) {
						console.log("success !");
						app.clearLayoutArea();
						app.loadLayoutArea(data);

					},
					error : function (response){
						console.log('failed !');
						$("#modal-example").modal('hide');
						$("#Error-Modal").modal('show');
					}
				});
			}
			
			/*All The Event Handlers*/
			/*.Live is being Used as I am modifying the .innerHTML contents. THis destroys the events.
			I either need to maintain a new Data structure that keeps a track of Images on each layout cell (OR)
			just store the innerHTML content in the file. I used approach two as If you do split the cell's then it's difficult to keep
			track of how many rows are present in cell 1 assuming it can be further split*/
			$('.palletCell').live('dragstart', app.dragStart);
			$('.layoutCell').live('dragstart', app.dragStart);
			$('.layoutCell').live('dragenter', app.dragEnter);
			$('.layoutCell').live('dragover', app.dragOver);
			$('.layoutCell').live('drop', app.newDrop);
			$(window).load(function(){
				app.initialize();
			});
			
		/*	$('#horizontal').live('click',app.horizontalSplit);
		$('#vertical').live('click',app.verticalSplit);*/
		$('#addNewLayoutCell').live('click',app.addLayoutCell);
		$(".btn-show-modal").live('click',function(e){
			e.preventDefault();
			$("#modal-example").modal('show');
		});
		$("#load").live('click',app.loadLayout);




		/*Ajax Call To Save the layout Contents to File.*/
		$("#saveButton").live('click',function(event){
				/*I could Have directly passed this data via data attribute in AJAX call, But I found it easier 
				to create a JSON object.

				Note At the server Side, I am directly storing the HTML contents in a file.
				The FileName is same as the Layout Name user enters.
				Since there are only two parameter i.e fileName and data, I DID not use GSON to JSSON and vicecersa and create objects.
				As I fellt I could directly handle two attributes.
				*/
				var validateFileName = function(){
					var fileName = $("#saveAs")[0].value.trim();
					if(app.isSaveFileNamePresent(fileName)){
						alert('file exists already.');
					}else{
						app.makeAjaxCall();
					}
				}

				var saveFile = {
					"action" : "save",
					"saveFile.name" : $("#saveAs")[0].value.trim(),
					"saveFile.data" : $('.layoutArea')[0].innerHTML
				};

				app.clearSaveModal = function(){
					$('#saveAs')[0].value = "";
				}

				app.makeAjaxCall = function(){
					$.ajax({
						url:'saveAction',
						type: 'POST',
						data: saveFile,
						success: function (data) {
							console.log("success !");
							$('#loadLayouts').removeClass( "hideLoadOption" );
							app.newOptionAdded($("#saveAs")[0].value.trim());
							app.clearSaveModal();
							$("#modal-example").modal('hide');
							$("#Success-Modal").modal('show');
						},
						error : function (response){
							app.clearSaveModal();
							$("#modal-example").modal('hide');
							$("#Error-Modal").modal('show');
							console.log('failed !');
						}
					});
				}	
				/*Since there was just one AJAX call, promise/Defered Concept was not used*/

				validateFileName();
				
			});
			

			

		});
