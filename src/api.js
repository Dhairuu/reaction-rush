const BASE_URL = 'http://localhost:8000/api'; // Change to your Django backend URL

export async function registerUser(name, email, password) {
  try {
    const response = await fetch(`${BASE_URL}/register-new-user/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    return await response.json();
  } catch (error) {
    console.error('Registration Error:', error.message);
    return null;
  }
}


export const loginUser = async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/login-user/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log('Login response:', data);
  
      if (response.ok) {
        return data; // This will contain the user data
      } else {
        console.error('Login failed:', data);
        throw new Error(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error in loginUser:', error);
      throw error;
    }
  };
  

  export const sendMatchData = async (matchData) => {
    try {
      const response = await fetch(`${BASE_URL}/create-new-match/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(matchData),  // Send match data in JSON format
      });
  
      if (!response.ok) {
        throw new Error('Failed to send match data');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error sending match data:', error);
      throw error;  // Rethrow error to handle it in the component
    }
  };
  