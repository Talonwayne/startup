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


## React stuff
import React from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

import {
  BrowserRouter,
  NavLink,
  Routes,
  Navigate,
  Route
} from "https://cdn.skypack.dev/react-router-dom";

function Home() {
  return <div className="home comp">Home</div>;
}

function About() {
  return <div className="about comp">About</div>;
}

function Users() {
  return <div className="users comp">Users</div>;
}

function Scores() {
  return <div className="scores comp">Scores</div>;
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/scores">Scores</NavLink>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/about" element={<About />} />
            <Route path="/users" element={<Users />} />
            <Route path="/scores" element={<Scores />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer>Footer</footer>
      </div>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));


















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
   

