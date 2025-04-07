const candidates = {
    IT: { President: [], "Vice President": [], GenSec: [], AssSec: [], Treasurer: [], Auditor: [], PIO: [] },
    "Food Processing": { President: [], "Vice President": [], GenSec: [], AssSec: [], Treasurer: [], Auditor: [], PIO: [] },
    Education: { President: [], "Vice President": [], GenSec: [], AssSec: [], Treasurer: [], Auditor: [], PIO: [] },
    USG: {
      President: [], "Vice President": [], GenSec: [], AssSec: [], Treasurer: [], Auditor: [], PIO: [], 
      "BTLED Rep": [], "BSIT Rep": [], "BFPT Rep": []
    }
  };

  const votes = structuredClone(candidates);
  const voteTracker = {};
  let currentUser = { role: '', department: '', id: '' };

  function selectRole(role) {
    currentUser.role = role;
    document.getElementById('roleSelectionForm').classList.add('d-none');
    document.getElementById('loginForm').classList.remove('d-none');
    
    // Hide department dropdown for COMELEC Officer role
    if (role === 'comelec') {
      document.getElementById('department').classList.add('d-none');
    } else {
      document.getElementById('department').classList.remove('d-none');
    }
  }

  function login() {
    const id = document.getElementById('id').value;
    const password = document.getElementById('password').value;
    const department = document.getElementById('department').value;

    if (!id || !password || (currentUser.role === 'student' && !department)) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== "1234") {
      alert("Incorrect password.");
      return;
    }

    currentUser = { ...currentUser, department, id };
    voteTracker[id] = voteTracker[id] || {};

    document.getElementById('loginForm').classList.add('d-none');

    if (currentUser.role === 'student') {
      document.getElementById('studentSection').classList.remove('d-none');
      showStudentVoting();
    } else {
      document.getElementById('comelecSection').classList.remove('d-none');
      showAllCandidates();
      showResults();
    }
  }

  function updatePositions() {
    const department = document.getElementById('candidateDept').value;
    const repOptions = document.querySelectorAll('.rep-option');

    if (department !== 'USG') {
      repOptions.forEach(option => option.classList.add('d-none'));
    } else {
      repOptions.forEach(option => option.classList.remove('d-none'));
    }
  }

  function showStudentVoting() {
    const dept = currentUser.department;
    const voted = voteTracker[currentUser.id];
    const deptDiv = document.getElementById('deptCandidates');
    const usgDiv = document.getElementById('usgCandidates');
    deptDiv.innerHTML = `<h4>${dept} Department Voting</h4>`;
    usgDiv.innerHTML = `<h4>USG Voting</h4>`;

    for (let pos in candidates[dept]) {
      if (voted[`${dept}-${pos}`]) {
        deptDiv.innerHTML += `<p><strong>${pos}:</strong> Already voted.</p>`;
      } else {
        deptDiv.innerHTML += `<p><strong>${pos}:</strong></p>`;
        candidates[dept][pos].forEach(name => {
          deptDiv.innerHTML += `<button class="btn btn-outline-primary btn-sm m-1" onclick="vote('${dept}', '${pos}', '${name}')">${name}</button>`;
        });
      }
    }

    for (let pos in candidates.USG) {
      if (voted[`USG-${pos}`]) {
        usgDiv.innerHTML += `<p><strong>${pos}:</strong> Already voted.</p>`;
      } else {
        usgDiv.innerHTML += `<p><strong>${pos}:</strong></p>`;
        candidates.USG[pos].forEach(name => {
          usgDiv.innerHTML += `<button class="btn btn-outline-success btn-sm m-1" onclick="vote('USG', '${pos}', '${name}')">${name}</button>`;
        });
      }
    }
  }

  function vote(group, position, name) {
    const user = currentUser.id;
    const key = `${group}-${position}`;
    if (voteTracker[user][key]) {
      alert("You have already voted for this position.");
      return;
    }

    votes[group][position][name] = (votes[group][position][name] || 0) + 1;
    voteTracker[user][key] = true;
    alert(`You voted for ${name} as ${position} in ${group}.`);
    showStudentVoting();
  }

  function addCandidate() {
    const name = document.getElementById('newCandidate').value.trim();
    const dept = document.getElementById('candidateDept').value;
    const pos = document.getElementById('candidatePosition').value;

    if (!name || !dept || !pos) {
      alert("Please fill in all candidate details.");
      return;
    }

    candidates[dept][pos].push(name);
    alert(`${name} added to ${pos} in ${dept}.`);
    showAllCandidates();
    showResults();
  }

  function showAllCandidates() {
    const div = document.getElementById('allCandidates');
    div.innerHTML = '';
    for (let dept in candidates) {
      div.innerHTML += `<h5>${dept}</h5>`;
      for (let pos in candidates[dept]) {
        const list = candidates[dept][pos].map(n => `<li>${n}</li>`).join('');
        div.innerHTML += `<strong>${pos}:</strong><ul>${list}</ul>`;
      }
    }
  }

  function showResults() {
    let output = '';
    for (let dept in votes) {
      output += `${dept}:\n`;
      for (let pos in votes[dept]) {
        output += `  ${pos}:\n`;
        for (let name in votes[dept][pos]) {
          output += `    ${name}: ${votes[dept][pos][name]} votes\n`;
        }
      }
      output += '\n';
    }
    document.getElementById('results').textContent = output;
  }

  function logout() {
    currentUser = { role: '', department: '', id: '' };
    document.getElementById('roleSelectionForm').classList.remove('d-none');
    document.getElementById('studentSection').classList.add('d-none');
    document.getElementById('comelecSection').classList.add('d-none');
    document.getElementById('id').value = '';
    document.getElementById('password').value = '';
    document.getElementById('department').value = '';
  }