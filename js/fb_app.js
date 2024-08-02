//Firebase configuration
    const firebaseConfig = {
  apiKey: "AIzaSyAzKOmJjgym5vKkC4LYNDWTLX1Z9pk0Ylo",
  authDomain: "comments-sum.firebaseapp.com",
  projectId: "comments-sum",
  storageBucket: "comments-sum.appspot.com",
  messagingSenderId: "879878275485",
  appId: "1:879878275485:web:bcbbd0f7aaf59dd213ef74",
  measurementId: "G-2S8CWD8LFC"
};

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    // Sign in anonymously
    firebase.auth().signInAnonymously().catch(function(error) {
      console.error('Error signing in anonymously: ', error);
    });

    // Add comment to Firestore
    document.getElementById('guestbook-form').addEventListener('submit', function(event) {
      event.preventDefault();

      const user = firebase.auth().currentUser;
      if (user) {
        const name = document.getElementById('name').value;
        const comment = document.getElementById('comment').value;
        const anonymous = document.getElementById('anonymous').checked;

        db.collection('comments').add({
          name: anonymous ? 'Anonymous' : name,
          comment: comment,
          approved: false,  // Default to not approved
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          uid: user.uid
        }).then(function() {
          alert('Comment submitted for review.');
        }).catch(function(error) {
          console.error('Error adding comment: ', error);
        });
      }
    });

    // Load approved comments
    db.collection('comments').where('approved', '==', true).orderBy('timestamp', 'desc')
      .onSnapshot(function(snapshot) {
        const commentsList = document.getElementById('comments-list');
        commentsList.innerHTML = '';
        snapshot.forEach(function(doc) {
          const comment = doc.data();
          const listItem = document.createElement('li');
          listItem.textContent = `${comment.name}: ${comment.comment}`;
          commentsList.appendChild(listItem);
        });
      });
  </script>
