Sample Readme (delete the above when you're ready to submit, and modify the below so with your links and descriptions)
---

## Your Web Application Title
Include a very brief summary of your project here. Be sure to include the CSS positioning technique you used, and any required instructions to use your application.
The project is an expansion of the example dictionary provided at the start. It logs car models, release year, mpg, and the derived price of the car. I used flexbox to position the CSS. Enter whatever information you want for the model, year, and mpg and then click the submit button. If you enter a non-number into the year or mpg, it will become null, and the price will not be calculated.

render link:

## Technical Achievements
- **Tech Achievement 1**: I made a function that displays data based on a JSON input. It takes the data and puts it into a <table> tag that's organized based on the dictionary saved on the server side. Whenever the client makes a /submit, /modify, /delete, or /data request (a mix of POST and GET requests), the server sends a JSON of the appdata dictionary to the client that then calls displayData().

- **Tech Achievement 2**: I made a /modify POST request option that uses the prompt() function to ask the user for new entries for model, year, and mpg. I added a button to each row that the user can click to start the modify process, and that button passes along an index. The new data is then saved into a JSON and replaces the entry at the given index in the appdata dictionary that stores all of the information. After editing the info, I then end the response and call the displayData() function to update what the user sees client side based on the server side modifications that were made.

### Design/Evaluation Achievements
- **Design Achievement 1**:
Tasks:
add 2 rows
delete and edit some rows
open the data

Last Name: Zhou
Problems: It took a second to find the area to add entries.
Comments: They really didn't like the base entry of Ford. They got surprised when the edit button let them edit every entry instead of just one.
Changes: Rename 'submit' button to 'add entry'.
