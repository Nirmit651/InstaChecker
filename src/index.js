import './styles.css';
import JSZip from 'jszip';

document.addEventListener('DOMContentLoaded', () => {
    const dropArea = document.getElementById('drop-area');
    const output = document.getElementById('output');

    // Prevent default behaviors (Prevent file from being opened)
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight drop area when file is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.add('highlight'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.remove('highlight'), false);
    });

    // Handle dropped items
    dropArea.addEventListener('drop', handleDrop, false);

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    async function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;

        [...files].forEach(file => {
            if (file.name.endsWith('.zip')) {
                handleZipFile(file);
            } else {
                console.error('Please upload a zip file.');
            }
        });
    }

    async function handleZipFile(file) {
        const jszip = new JSZip();
        try {
            const zip = await jszip.loadAsync(file);
            let followersData = null;
            let followingData = null;

            // Path to the JSON files inside the zip
            const followersPath = 'connections/followers_and_following/followers_1.json';
            const followingPath = 'connections/followers_and_following/following.json';

            // Extract and parse the followers JSON
            if (zip.files[followersPath]) {
                const content = await zip.files[followersPath].async('string');
                followersData = JSON.parse(content);
                console.log('Followers JSON loaded:', followersData);
            } else {
                console.error('followers_1.json not found in the zip file.');
            }

            // Extract and parse the following JSON
            if (zip.files[followingPath]) {
                const content = await zip.files[followingPath].async('string');
                followingData = JSON.parse(content);
                console.log('Following JSON loaded:', followingData);
            } else {
                console.error('following.json not found in the zip file.');
            }

            // If both files are found and loaded, process the data
            if (followersData && followingData) {
                loadInstagramData(followersData, followingData);
            } else {
                console.error('Required JSON files not found in the zip archive.');
            }
        } catch (error) {
            console.error('Error reading zip file:', error);
        }
    }

    async function loadInstagramData(followersData, followingData) {
        let Followers = [];
        let Following = [];

        if (followersData) {
            console.log("Followers Data:", followersData);
            Followers = getFollowers(followersData);
        } else {
            console.log("Followers data is empty or failed to load.");
        }

        if (followingData) {
            console.log("Following Data:", followingData);
            Following = getFollowing(followingData);
            console.log("Following Array:", Following);
        } else {
            console.log("Following data is empty or failed to load.");
        }

        // Now that Followers and Following arrays are populated, calculate the unique followers and following
        let uniqueFollowers = getFans(Followers, Following);
        let uniqueFollowing = getDoesntFollowBack(Followers, Following);

        renderNames(uniqueFollowers, uniqueFollowing);

        console.log('Your fans:', uniqueFollowers);
        console.log('Doesn\'t Follow you back:', uniqueFollowing);
    }

    function getFollowers(followersData) {
        let usernames = [];

        for(let i = 0; i < followersData.length; i++) {
            const user = followersData[i].string_list_data[0].value;
            if (user) {
                usernames.push(user);
            } else {
                console.log(`Invalid or missing data at index ${i}:`, followersData[i]);
            }
        }
        console.log('Extracted usernames:', usernames);
        return usernames;
    }

    function getFollowing(followingData) {
        let usernames = [];

        for(let i = 0; i < followingData.relationships_following.length; i++) {
            const user = followingData.relationships_following[i].string_list_data[0].value;
            if (user) {
                usernames.push(user);
            } else {
                console.log(`Invalid or missing data at index ${i}:`, relationshipsData[i]);
            }
        }
        console.log('Extracted usernames:', usernames);
        return usernames;
    }

    function getFans(followers, following) {
        return followers.filter((user) => !following.includes(user));
    }

    function getDoesntFollowBack(followers, following) {
        return following.filter((user) => !followers.includes(user));
    }

    function renderNames(uniqueFollowers, uniqueFollowing) {
        //for fans
        const fansListContainer = document.querySelector('#fans-list');
        fansListContainer.innerHTML = ''; // Clear previous content
        const fansOutputList = document.createElement('ul');
        fansOutputList.classList.add('output-list');

        uniqueFollowers.forEach((name) => {
             const listElement = document.createElement('li');
             listElement.textContent = name;
             fansOutputList.appendChild(listElement);
        });
        fansListContainer.appendChild(fansOutputList);

        //for unfollower
        const unfollowerContainer = document.querySelector('#unfollowers-list');
        unfollowerContainer.innerHTML = ''; // Clear previous content
        const unfollowerOutputList = document.createElement('ul');
        unfollowerOutputList.classList.add('output-list');

        uniqueFollowing.forEach((name) => {
             const listElement = document.createElement('li');
             listElement.textContent = name;
             unfollowerOutputList.appendChild(listElement);
        });
        unfollowerContainer.appendChild(unfollowerOutputList);
    }

    const instructionBtn = document.querySelector('.instructions');
    const body = document.querySelector('body');

    instructionBtn.addEventListener('click', () => {

        const overlay = document.createElement('div');
        overlay.id = 'modal-overlay';
        body.appendChild(overlay);

        overlay.addEventListener('click', (e) => {
            overlay.remove();
        });

        const modal = document.createElement('div');
        modal.id = 'modal';
        overlay.appendChild(modal);

        const modalTitle = document.createElement('h2');
        modalTitle.textContent = 'Instructions';
        modalTitle.style.margin = '0px';
        modal.appendChild(modalTitle);

        const instructions = document.createElement('h4');
        instructions.textContent = 'On a computer, log into you IG account on instagram.com. Click More in the bottom left > Settings > Accounts Center > Your Information and Permissions > Download Your Information > Download or Transfer Information > Some of Your Information > Scroll down to connectios and click followers and following > click next > Download to Device > Make Data Range All Time and change Format to JSON > Wait for the file to be generated (you\'ll get an email when its generated) > Download the file and then drag and drop into the box.';
        instructions.style.marginTop = '10px'
        instructions.style.marginBottom = '0px'
        instructions.style.fontWeight = 'normal';
        modal.appendChild(instructions);

        console.log('test')


    });
});

