# Class notes
Markdown information
Headings use "#"

## A lower
### Even lower




I have added 4 CSS files with flexagle sizing, then I just used 1 that has a nice looking darkmode theme and a better display of the ranking system and whatnot. 


##website with the elastic IP
http://34.194.100.178/

Command to enter ➜  
ssh -i production.pem ubuntu@34.194.100.178


Perms restriction
chmod  600 production.pem

### HTML and CSS Questions:

1. **Link Element (`<link>`):**
   - It is used to link external resources, like CSS files, to the HTML document.
   - Example: `<link rel="stylesheet" href="styles.css">` links an external CSS file.

2. **Div Tag (`<div>`):**
   - The `<div>` element is a block-level container that is often used to group other HTML elements for styling or layout purposes.

3. **#title vs .grid Selector:**
   - `#title` selects an element with the specific ID of "title" (IDs are unique per page).
   - `.grid` selects elements with the class "grid" (classes can be reused for multiple elements).

4. **Padding vs Margin:**
   - **Padding** is the space inside an element, between the content and the border.
   - **Margin** is the space outside an element, separating it from other elements.

5. **Flexbox Display for Images:**
   - Flexbox layout can distribute images based on flex properties like `justify-content` and `align-items`. For example, with `display: flex`, images will be displayed in a row or column based on the flex direction.

6. **Padding CSS:**
   - Example: `padding: 10px 20px;` adds 10px of padding to the top and bottom, and 20px to the left and right.

### JavaScript and DOM Questions:

7. **Arrow Function Syntax:**
   - Example: `const add = (a, b) => a + b;` is an arrow function that adds two numbers. It’s a shorthand for defining functions in JavaScript.

8. **Using `map` with an Array:**
   - The `map()` function creates a new array by applying a function to every element in the original array.
   - Example: `[1, 2, 3].map(x => x * 2)` outputs `[2, 4, 6]`.

9. **`getElementById` and `addEventListener`:**
   - Example: `document.getElementById('myButton').addEventListener('click', () => alert('Clicked!'));` sets up a click event listener on an element with ID `myButton` and shows an alert when clicked.

10. **`#` Selector in JavaScript:**
    - Example: `document.querySelector('#title')` selects the element with the ID `title` in JavaScript.

11. **True about the DOM:**
    - The DOM (Document Object Model) represents the structure of an HTML document as a tree of nodes, with elements and attributes accessible via JavaScript.

12. **Default CSS Display Value for `<span>`:**
    - The `<span>` element has a default `display: inline` property.

### Practical CSS and HTML:

13. **CSS to Change Background Color:**
    - Example: `div { background-color: red; }` changes the background color of all `<div>` elements to red.

14. **Displaying an Image with a Hyperlink:**
    - Example: `<a href="https://example.com"><img src="image.jpg" alt="Image"></a>` creates an image that acts as a clickable hyperlink.

15. **CSS Box Model Order:**
    - From inside to outside: `content -> padding -> border -> margin`.

16. **Changing Specific Text to Green:**
    - Example: `span { color: green; }` would change all text within `<span>` tags, but you can use more specific selectors to affect only "trouble."

### JavaScript Manipulation and Loops:

17. **For Loop with `console.log`:**
    - Example: A simple for loop like `for(let i = 0; i < 3; i++) console.log(i);` would output: `0, 1, 2`.

18. **Selecting Element by ID and Changing Text Color:**
    - Example: `document.getElementById('byu').style.color = 'green';` selects the element with ID `byu` and changes its text color to green.

19. **Opening HTML Tags:**
    - `<p>` for paragraphs, `<ol>` for ordered lists, `<ul>` for unordered lists, `<h2>` for second level heading, etc.

20. **Declaring Doctype in HTML:**
    - The declaration is `<!DOCTYPE html>`.

### JavaScript Syntax and Objects:

21. **If, Else, For, While, Switch Syntax:**
    - Basic syntax examples:
      - `if (condition) { ... } else { ... }`
      - `for (let i = 0; i < 10; i++) { ... }`
      - `while (condition) { ... }`
      - `switch (expression) { case value: ... }`

22. **JavaScript Object Creation:**
    - Example: `const person = { name: 'Talon', age: 30 };`

23. **Adding Properties to Objects:**
    - Yes, you can add new properties like `person.job = 'Neuroscientist';`.

### Miscellaneous and Linux Commands:

24. **JavaScript Tag in HTML:**
    - Use `<script>` to include JavaScript in an HTML page.

25. **Using JavaScript to Change Specific Text:**
    - Example: `document.querySelector('.animal').textContent = 'crow';` changes the text "animal" to "crow."

26. **What is JSON:**
    - JSON (JavaScript Object Notation) is a lightweight format for storing and transporting data, often used for API responses.

27. **Linux Console Commands:**
    - `chmod`: Change file permissions.
    - `pwd`: Print working directory.
    - `cd`: Change directory.
    - `ls`: List files.
    - `nano/vim`: Text editors.
    - `mkdir`: Create a directory.
    - `mv`: Move files.
    - `rm`: Remove files.
    - `ssh`: Secure Shell, remote login.
    - `wget`: Download files from the web.
    - `sudo`: Execute a command as another user (usually root).

28. **Remote Shell Session Command:**
    - The `ssh` command creates a remote shell session.

29. **Using `ls -la`:**
    - This option shows detailed information about files, including hidden files, in a list format.

30. **Domain Structure:**
    - For `banana.fruit.bozo.click`, `.click` is the top-level domain, `bozo` is the root domain, and `banana.fruit` is a subdomain.

31. **HTTPS Certificate:**
    - Yes, a web certificate is necessary for HTTPS.

32. **DNS A Record:**
    - Yes, a DNS A record can point to an IP address.

33. **Reserved Ports:**
    - Port 443 is for HTTPS, Port 80 is for HTTP, and Port 22 is for SSH.

### JavaScript Promises:

34. **Promise Output:**
    - Understanding Promises is key: if you resolve a promise, it might output the resolved value, or it could show how chaining works with `.then()`.
   
### HTML and CSS Questions:

1. **Link Element (`<link>`):**
   - Example:
     ```html
     <head>
       <link rel="stylesheet" href="styles.css">
     </head>
     ```
     This links an external CSS file named `styles.css` to the HTML document.

2. **Div Tag (`<div>`):**
   - Example:
     ```html
     <div>
       <p>This is a paragraph inside a div.</p>
     </div>
     ```
     The div element groups content together.

3. **#title vs .grid Selector:**
   - Example:
     ```html
     <style>
       #title {
         color: red;
       }
       .grid {
         display: grid;
       }
     </style>
     <h1 id="title">This is a title</h1>
     <div class="grid">This is a grid container</div>
     ```

4. **Padding vs Margin:**
   - Example:
     ```css
     .box {
       padding: 10px; /* Space inside the element */
       margin: 20px;  /* Space outside the element */
     }
     ```

5. **Flexbox Display for Images:**
   - Example:
     ```html
     <style>
       .container {
         display: flex;
       }
       .container img {
         width: 100px;
         height: 100px;
         margin: 10px;
       }
     </style>
     <div class="container">
       <img src="image1.jpg" alt="Image 1">
       <img src="image2.jpg" alt="Image 2">
     </div>
     ```
     This displays two images side by side with flexbox.

6. **Padding CSS:**
   - Example:
     ```css
     .box {
       padding: 10px 20px;
     }
     ```
     Adds 10px padding to the top and bottom, and 20px padding to the left and right.

### JavaScript and DOM Questions:

7. **Arrow Function Syntax:**
   - Example:
     ```javascript
     const add = (a, b) => a + b;
     console.log(add(2, 3)); // Outputs: 5
     ```

8. **Using `map` with an Array:**
   - Example:
     ```javascript
     const numbers = [1, 2, 3];
     const doubled = numbers.map(x => x * 2);
     console.log(doubled); // Outputs: [2, 4, 6]
     ```

9. **`getElementById` and `addEventListener`:**
   - Example:
     ```html
     <button id="myButton">Click Me!</button>
     <script>
       document.getElementById('myButton').addEventListener('click', () => {
         alert('Button clicked!');
       });
     </script>
     ```

10. **`#` Selector in JavaScript:**
    - Example:
      ```javascript
      document.querySelector('#title').textContent = 'New Title';
      ```

11. **True about the DOM:**
    - Example:
      The DOM represents this structure:
      ```html
      <html>
        <body>
          <h1 id="title">Title</h1>
          <p class="paragraph">Paragraph content.</p>
        </body>
      </html>
      ```

12. **Default CSS Display Value for `<span>`:**
    - Example:
      ```html
      <span>This text is inline by default.</span>
      ```

### Practical CSS and HTML:

13. **CSS to Change Background Color:**
    - Example:
      ```css
      div {
        background-color: red;
      }
      ```

14. **Displaying an Image with a Hyperlink:**
    - Example:
      ```html
      <a href="https://example.com">
        <img src="image.jpg" alt="Image">
      </a>
      ```

15. **CSS Box Model Order:**
    - Example:
      ```css
      .box {
        padding: 10px;
        border: 2px solid black;
        margin: 15px;
      }
      ```

16. **Changing Specific Text to Green:**
    - Example:
      ```html
      <p><span class="green">trouble</span> double</p>
      <style>
        .green {
          color: green;
        }
      </style>
      ```

### JavaScript Manipulation and Loops:

17. **For Loop with `console.log`:**
    - Example:
      ```javascript
      for(let i = 0; i < 3; i++) {
        console.log(i);
      }
      // Outputs: 0, 1, 2
      ```

18. **Selecting Element by ID and Changing Text Color:**
    - Example:
      ```javascript
      document.getElementById('byu').style.color = 'green';
      ```

19. **Opening HTML Tags:**
    - Example:
      ```html
      <p>Paragraph</p>
      <ol>
        <li>Ordered list item</li>
      </ol>
      <ul>
        <li>Unordered list item</li>
      </ul>
      <h2>Second-level Heading</h2>
      ```

20. **Declaring Doctype in HTML:**
    - Example:
      ```html
      <!DOCTYPE html>
      ```

### JavaScript Syntax and Objects:

21. **If, Else, For, While, Switch Syntax:**
    - Example:
      ```javascript
      if (a > b) {
        console.log('a is greater');
      } else {
        console.log('b is greater or equal');
      }
      ```

22. **JavaScript Object Creation:**
    - Example:
      ```javascript
      const person = { name: 'Talon', age: 30 };
      console.log(person.name); // Outputs: Talon
      ```

23. **Adding Properties to Objects:**
    - Example:
      ```javascript
      const person = { name: 'Talon', age: 30 };
      person.job = 'Neuroscientist';
      console.log(person.job); // Outputs: Neuroscientist
      ```

### Miscellaneous and Linux Commands:

24. **JavaScript Tag in HTML:**
    - Example:
      ```html
      <script>
        console.log('This is JavaScript');
      </script>
      ```

25. **Using JavaScript to Change Specific Text:**
    - Example:
      ```javascript
      document.querySelector('.animal').textContent = 'crow';
      ```

26. **What is JSON:**
    - Example:
      ```json
      {
        "name": "Talon",
        "age": 30
      }
      ```

27. **Linux Console Commands:**
    - Example: 
      - `chmod`: Change file permissions.
      - `pwd`: Print working directory.
      - `cd`: Change directory.
      - `ls`: List files.
      - `nano/vim`: Text editors.
      - `mkdir`: Create a directory.
      - `mv`: Move files.
      - `rm`: Remove files.
      - `ssh`: Secure Shell, remote login.
      - `wget`: Download files from the web.
      - `sudo`: Execute a command as another user (usually root).

28. **Remote Shell Session Command:**
    - Example:
      ```bash
      ssh user@server.com
      ```

29. **Using `ls -la`:**
    - Example:
      ```bash
      ls -la
      # Outputs detailed list of files, including hidden ones.
      ```

30. **Domain Structure:**
    - Example for `banana.fruit.bozo.click`:
      - `.click` is the top-level domain,
      - `bozo` is the root domain,
      - `banana.fruit` is a subdomain.

31. **HTTPS Certificate:**
    - Yes, a web certificate is required to use HTTPS.

32. **DNS A Record:**
    - Example:
      ```txt
      example.com  IN  A  192.168.1.1
      ```

33. **Reserved Ports:**
    - Example:
      - Port 443 is for HTTPS,
      - Port 80 is for HTTP,
      - Port 22 is for SSH.

### JavaScript Promises:

34. **Promise Output:**
    - Example:
      ```javascript
      const promise = new Promise((resolve, reject) => {
        resolve('Success!');
      });
      promise.then(result => console.log(result)); // Outputs: Success!
      ```

