
						var app1= {};
						app1.horizontalSplit = function(event){
							var currentTD = $(event.target).closest('td');
							var parentRow = $(event.target).closest('tr');

					/*The Current COlumn is going to be split to 2 rows.
					Hence The attribute of making the entire column draggable should be removed here
					And added to individual tr that is going to be added as Children

					SHortHand: Instead of adding twice, clone and then remove draggable from parent*/


					var currentTDClone1 = $(event.target).closest('td').clone(true);
					$(currentTD).removeAttr('draggable');


					var newWidth = parseInt(currentTDClone1[0].dataset.width); 
					var newHeight =  parseInt(currentTDClone1[0].dataset.height)/2;
					$(currentTDClone1)[0].dataset.width = newWidth;
					$(currentTDClone1)[0].dataset.height = newHeight;
					$(currentTDClone1).find('div').removeAttr('draggable');
					$(currentTDClone1).find('div').css('width',newWidth+"px")
					$(currentTDClone1).find('div').css('height',newHeight+"px");
					$(currentTDClone1).find('div').css('max-width',newWidth+"px")
					$(currentTDClone1).find('div').css('max-height',newHeight+"px");


					$(currentTDClone1).find('img').css('width',newWidth+"px");
					$(currentTDClone1).find('img').css('height',newHeight+"px");
					$(currentTDClone1).find('img').css('max-width',newWidth+"px")
					$(currentTDClone1).find('img').css('max-height',newHeight+"px");
				//	$(currentTDClone1).find('img').attr('draggable',true);

				$(currentTDClone1).css('width',newWidth+"px");
				$(currentTDClone1).css('height',newHeight+"px");
				$(currentTDClone1).css('max-width',newWidth+"px")
				$(currentTDClone1).css('max-height',newHeight+"px");

				var currentTDClone2 = $(currentTDClone1).clone(true);

				var tr1 = $('<tr>')[0];
				var tr2 = $('<tr>')[0];
				
				$(tr1).append(currentTDClone1);
				$(tr2).append(currentTDClone2);
				
				$(tr1).css('max-width',newWidth+"px");
				$(tr2).css('max-height',newHeight+"px");
				
				$(tr1).css('width',newWidth+"px");
				$(tr1).css('height',newHeight+"px");
				$(tr2).css('width',newWidth+"px");
				$(tr2).css('height',newHeight+"px");


				$(currentTD).empty();
				$(currentTD).append(tr1);
				$(currentTD).append(tr2);
				event.stopPropagation();

				
				
				
				

			}

			app1.verticalSplit = function(event){


				var currentTD = $(event.target).closest('td');
				var parentRow = $(event.target).closest('tr');
				var currentDiv = $(event.target).closest('div');
				var imageURL = $(event.target).attr('src');

				var newWidth = parseInt(currentTD[0].dataset.width)/2; 
				var newHeight =  parseInt(currentTD[0].dataset.height);

				var td1 = $($(currentTD).clone(true))[0];
				$(td1).empty();
				var div1 = $('<div>')[0];	
				var img1 = $('<img>')[0];
				$(div1).attr('draggable',true);
				$(div1).addClass('layoutCell');
				$(img1).attr('src',imageURL);

				$(td1)[0].dataset.width = newWidth;
				$(td1)[0].dataset.height = newHeight;

				$(td1).css('width',newWidth+"px");
				$(td1).css('height',newHeight+"px");
				$(td1).css('max-width',newWidth+"px");
				$(td1).css('max-height',newHeight+"px");


				$(div1).css('width',newWidth+"px");
				$(div1).css('height',newHeight+"px");
				$(div1).css('max-width',newWidth+"px");
				$(div1).css('max-height',newHeight+"px");

				$(img1).css('width',newWidth+"px");
				$(img1).css('height',newHeight+"px");
				$(img1).css('max-width',newWidth+"px");
				$(img1).css('max-height',newHeight+"px");

				$(div1).append(img1);
				$(td1).append(div1);


				var td2 = $(td1).clone(true);
				$(currentTD).empty();
				$(currentTD).append(td1)	;
				$(currentTD).append(td2)	;



				event.stopPropagation();

			}

			$(document).ready(function(){
				$('td').live('click',function(event){
					var splitChoice = $('input[type=radio]:checked').attr('id');
					switch(splitChoice){
						case "horizontal" : app1.horizontalSplit(event);
						break;
						case "vertical":
						app1.verticalSplit(event);
						break;
					}


				});
			});
		