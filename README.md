# PredictSpringChallenge
******************************
ReadMe 
******************************
<p>1.Front End - jQuery , BootStrap 3, fontAwesome , HTML5, CSS3</p>
<p>2.Application Logic - Servlet.</p><br>

<pre>
The Snapshot of the Program is called : <strong>ScreenShot.Png</strong>.
This is How I see The scrren and there was no manipulation of the output of any sort.
I will be more than happy to share my screen to show the same.

Note : For saving the contents: 
1. I found it easier to write to a file.
		I Did Not Make use of GSON to JSON and viceversa since:
			1. Even if you store it as object, data/content needs to be a string
			2. The string might be too large.
			3. Hence found it convenient to store the content in a file

2. Data-attributes: Since there were lot od css manipulation I made use of data-attributes to keep track of currentWidth and height of each td.

3. Load option's show up once the layout is saved. If there are no saved layouts, the option is hidden.



Bugs:
		1.Yes There's one Bug.
		2. THis is more to do with vertical Split Only. 
				1.TD Width could not be fixed. Hence I had to use a div within the TD to have fixed width.
				2. Hence, when you split vertically, The current <td> is superimposed with two td's each half the size of original
				3. But when I save and load the layout, since the parent row will have an additional td, the layout will have an extra td.
				4. I tried appending the two newly created td elemts directly to the current ROW.
				5. But, td always took 100% of tr no matter what manipulations I tried.(viz jQuery, new DIV)

</pre>
