var log_in = document.getElementById("login");
var signup = document.getElementById("signup");

//-----------------------------js-for-regestration--------------------------------
function login() {
        log_in.style.left = "65px";
        signup.style.right = "-520px";
        log_in.style.opacity = 1;
        signup.style.opacity = 0;

        // clear all inputs in signup form
        document.getElementById('firstName').value = '';
        document.getElementById('lastName').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('configPass').value = '';

    }

    function register() {
        log_in.style.left = "-490px";
        signup.style.right = "65px";
        log_in.style.opacity = 0;
        signup.style.opacity = 1;
        
        // clear all inputs in signin form
        document.getElementById('username').value = '';
        document.getElementById('passin').value = '';
    }

    //---------------------------------------js-for-user post popup btns-form------------------------
    function openForm() {
      document.getElementById("mainwrapper").style.pointerEvents = "none" ;
      document.getElementById("mainwrapper").style.userSelect = "none" ;
      document.getElementById("mainwrapper").style.filter = "blur(3px)" ;
    
      document.getElementById("popup").style.visibility = "visible" ;
      document.getElementById("popup").style.opacity = "1" ;
      document.getElementById("popup").style.transition = "0.5s" ;
    
    }
    
    function closeForm() {
      document.getElementById("popup").style.visibility = "hidden";
      document.getElementById("popup").style.opacity = "0";
      document.getElementById("popup").style.transition = "0.5s";
    
      document.getElementById("mainwrapper").style.pointerEvents = "";
      document.getElementById("mainwrapper").style.userSelect = "";
      document.getElementById("mainwrapper").style.filter = "";
    
    
    }

    //---------------------------------------js-for-user edit popup btns-form------------------------

    function openEditForm() {
      document.getElementById("mainwrapper").style.pointerEvents = "none" ;
      document.getElementById("mainwrapper").style.userSelect = "none" ;
      document.getElementById("mainwrapper").style.filter = "blur(3px)" ;
    
      document.getElementById("popup2").style.visibility = "visible" ;
      document.getElementById("popup2").style.opacity = "1" ;
      document.getElementById("popup2").style.transition = "0.5s" ;
    
    }
    function closeEditForm() {
      document.getElementById("popup2").style.visibility = "hidden";
      document.getElementById("popup2").style.opacity = "0";
      document.getElementById("popup2").style.transition = "0.5s";
    
      document.getElementById("mainwrapper").style.pointerEvents = "";
      document.getElementById("mainwrapper").style.userSelect = "";
      document.getElementById("mainwrapper").style.filter = "";
    
    
    }
    //----------------------------------------js-for post form btns------------------------------
    
    //btn of upload audiofile
    let fileInput = document.getElementById("file-input");
    let fileList = document.getElementById("files-list");
    let numOfFiles = document.getElementById("num-of-files");
    
    fileInput.addEventListener("change", () => {
      fileList.innerHTML = "";
      numOfFiles.textContent = `${fileInput.files.length} File Selected`;
    
      
      for (i of fileInput.files) {
        let reader = new FileReader();
        let listItem = document.createElement("li");
        let fileName = i.name;
        let fileSize = (i.size / 1024).toFixed(1);
        listItem.innerHTML = `<p>${fileName}</p><p>${fileSize}KB</p>`;
        if (fileSize >= 1024) {
          fileSize = (fileSize / 1024).toFixed(1);
          listItem.innerHTML = `<p>${fileName}</p><p>${fileSize}MB</p>`;
        }
        fileList.appendChild(listItem);
      }
    });
    //btn of upload img
    var loadFile = function(event) {
        var image = document.getElementById('output');
        image.src = URL.createObjectURL(event.target.files[0]);
    };
      //btn of upload img
      var loadFilee = function (event) {
        var image = document.getElementById('output2');
        image.src = URL.createObjectURL(event.target.files[0]);
  }


    //---------------------------------------------------js-for edit form btns

    
    
    
    
    
    
