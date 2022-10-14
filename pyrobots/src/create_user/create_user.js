
const handleChange = () => {}

const handleSubmit = () => {}

function Create_user() {
    return (
      <>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label>Name: </label>
          <input type="text" name="name" placeholder="enter your name" onChange={handleChange} />
          <br />
          <br />
          <label>Email: </label>
          <input type="text" name="email" placeholder="enter your email" onChange={handleChange} />
          <br />
          <br />
          <label>Password: </label>
          <input type="password" name="password" placeholder="enter your password" onChange={handleChange} />
          <br />
          <br />
          <button type="submit">Register</button>
        </form>
      </>
    );
  }

export default Create_user;