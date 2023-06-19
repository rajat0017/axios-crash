// GET REQUEST
function getTodos() {
  axios.get('/api/todos')
    .then(function (response) {
      showOutput(response);
      console.log('GET Request');
    })
    .catch(function (error) {
      console.error(error);
    });
}

// POST REQUEST
function addTodo() {
  axios.post('/api/todos', { title: 'New Todo', completed: false })
    .then(function (response) {
      showOutput(response);
      console.log('POST Request');
    })
    .catch(function (error) {
      console.error(error);
    });
}

// PUT/PATCH REQUEST
function updateTodo() {
  axios.patch('/api/todos/1', { completed: true })
    .then(function (response) {
      showOutput(response);
      console.log('PUT/PATCH Request');
    })
    .catch(function (error) {
      console.error(error);
    });
}

// DELETE REQUEST
function removeTodo() {
  axios.delete('/api/todos/1')
    .then(function (response) {
      showOutput(response);
      console.log('DELETE Request');
    })
    .catch(function (error) {
      console.error(error);
    });
}

// SIMULTANEOUS DATA
function getData() {
  axios.all([
    axios.get('/api/todos'),
    axios.get('/api/posts')
  ])
    .then(axios.spread(function (todosResponse, postsResponse) {
      // Process the response for todos
      console.log('Todos:', todosResponse.data);

      // Process the response for posts
      console.log('Posts:', postsResponse.data);

      console.log('Simultaneous Request');
    }))
    .catch(function (error) {
      console.error(error);
    });
}

// CUSTOM HEADERS
function customHeaders() {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer TOKEN'
    }
  };

  axios.get('/api/data', config)
    .then(function (response) {
      showOutput(response);
      console.log('Custom Headers');
    })
    .catch(function (error) {
      console.error(error);
    });
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const config = {
    transformResponse: axios.defaults.transformResponse.concat(function (data) {
      // Transform the response data
      data.transformed = true;
      return data;
    })
  };

  axios.get('/api/data', config)
    .then(function (response) {
      showOutput(response);
      console.log('Transform Response');
    })
    .catch(function (error) {
      console.error(error);
    });
}

// ERROR HANDLING
function errorHandling() {
  axios.get('/api/nonexistent')
    .then(function (response) {
      showOutput(response);
      console.log('Error Handling');
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made, but the server responded with an error status
        console.log('Error Status:', error.response.status);
        console.log('Error Data:', error.response.data);
      } else if (error.request) {
        // The request was made, but no response was received
        console.log('No Response:', error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error('Error:', error.message);
      }
    });
}

// CANCEL TOKEN
function cancelToken() {
  const source = axios.CancelToken.source();

  axios.get('/api/data', {
    cancelToken: source.token
  })


// INTERCEPTING REQUESTS & RESPONSES

// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
