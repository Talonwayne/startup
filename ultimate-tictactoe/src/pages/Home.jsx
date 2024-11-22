function Home() {
    return (
      <div className="container">
        <h1 className="text-center mt-4">Ultimate Tic Tac Toe</h1>
        <div className="card mt-4">
          <div className="card-body">
            <h2 className="card-title">Login</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username:</label>
                <input type="text" className="form-control" id="username" name="username" required />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password:</label>
                <input type="password" className="form-control" id="password" name="password" required />
              </div>
              <button type="submit" className="btn btn-primary">Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  
  export default Home;