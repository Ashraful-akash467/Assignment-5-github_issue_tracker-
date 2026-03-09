function login() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  if (username === "admin" && password === "admin123") {
    // go to home page
    window.location.href = "home.html";
  } else {
    alert("Invalid Username or Password");
  }
}

// Fetch all issues from API


// Display all issues
const displayAll = (issues) => {
    const container = document.getElementById("card");
    const counter = document.getElementById("issueCount");

    container.innerHTML = "";
    counter.textContent = issues.length;

    issues.forEach(issue => {


        const div = document.createElement("div");
        div.className = "w-[360px] bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden";

        div.innerHTML = `
            <!-- Top green line -->
            <div class="h-1 ${issue.status === "open" ? " bg-green-500" : "bg-red-500"} "></div>

            <!-- Card Body -->
            <div class="p-5">
                <div class="flex items-center justify-between mb-4">
                    <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <div class="w-5 h-5 border-2 border-green-500 rounded-full border-dashed"></div>
                    </div>
                    <span class="px-4 py-1 text-sm font-semibold ${
                            issue.priority === "high"
                                ? "text-red-500 bg-red-100"
                                : issue.priority === "medium"
                                ? "text-yellow-500 bg-yellow-100"
                                : "text-gray-500 bg-gray-200"
                        } rounded-full">
                            ${issue.priority || "low"}
                        </span>
                </div>

                <h2 class="text-lg font-semibold text-gray-800 leading-snug mb-2">
                    ${issue.title || "No Title"}
                </h2>

                <p class="text-gray-500 text-sm mb-4">
                    ${issue.description || "No description"}
                </p>


                                                            <!-- Tags -->
                                    <div class="flex gap-3 mb-4 flex-wrap">
                                                ${
                                                    issue.labels?.map(label => {
                                                        let colorClass = "text-gray-500 bg-gray-100";

                                                        if (label.toLowerCase() === "bug") {
                                                            colorClass = "text-red-500 bg-red-100";
                                                        } 
                                                        else if (label.toLowerCase() === "help wanted") {
                                                            colorClass = "text-yellow-500 bg-yellow-100";
                                                        } 
                                                        else if (label.toLowerCase() === "enhancement") {
                                                            colorClass = "text-green-500 bg-green-100";
                                                        }

                                                        return `<span class="px-3 py-1 text-sm font-semibold rounded-full ${colorClass}">
                                                                    ${label}
                                                                </span>`;
                                                    }).join("") || "<span class='text-gray-400'>No labels</span>"
                                                }
                                            </div>




                <div class="flex gap-3 mb-4">
                    ${issue.tags?.map(tag => `<span class="flex items-center gap-1 px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-full">${tag}</span>`).join('') || ''}
                </div>
            </div>

            <!-- Footer -->
            <div class="border-t border-gray-200 px-5 py-3 text-sm text-gray-500">
                <p>#${issue.id} by ${issue.author || "Unknown"}</p>
                <p>${new Date(issue.createdAt).toLocaleDateString() || ""}</p>
            </div>
        `;
        container.appendChild(div);
    });
};

// Display open issues
const displayOpen = (issues) => {
    const container = document.getElementById("card");
    const counter = document.getElementById("issueCount");

    container.innerHTML = "";

    const openIssues = issues.filter(issue => issue.status === "open");

    counter.textContent = openIssues.length;

    openIssues.forEach(issue => {

        const div = document.createElement("div");
        div.className = "w-[360px] bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden";

        div.innerHTML = `
            <div class="h-1 bg-green-500"></div>
            <div class="p-5">
                <div class="flex items-center justify-between mb-4">
                    <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <div class="w-5 h-5 border-2 border-green-500 rounded-full border-dashed"></div>
                    </div>
                    <span class="px-4 py-1 text-sm font-semibold ${
                            issue.priority === "high"
                                ? "text-red-500 bg-red-100"
                                : issue.priority === "medium"
                                ? "text-yellow-500 bg-yellow-100"
                                : "text-gray-500 bg-gray-200"
                        } rounded-full">
                            ${issue.priority || "low"}
                        </span>
                </div>

                <h2 class="text-lg font-semibold text-gray-800 leading-snug mb-2">
                    ${issue.title || "No Title"}
                </h2>

                <p class="text-gray-500 text-sm mb-4">
                    ${issue.description || "No description"}
                </p>

                                                        <!-- Tags -->
                                <div class="flex gap-3 mb-4 flex-wrap">
                                                    ${
                                                        issue.labels?.map(label => {
                                                            let colorClass = "text-gray-500 bg-gray-100";

                                                            if (label.toLowerCase() === "bug") {
                                                                colorClass = "text-red-500 bg-red-100";
                                                            } 
                                                            else if (label.toLowerCase() === "help wanted") {
                                                                colorClass = "text-yellow-500 bg-yellow-100";
                                                            } 
                                                            else if (label.toLowerCase() === "enhancement") {
                                                                colorClass = "text-green-500 bg-green-100";
                                                            }

                                                            return `<span class="px-3 py-1 text-sm font-semibold rounded-full ${colorClass}">
                                                                        ${label}
                                                                    </span>`;
                                                        }).join("") || "<span class='text-gray-400'>No labels</span>"
                                                    }
                                                </div>


                <div class="flex gap-3 mb-4">
                    ${issue.tags?.map(tag => `<span class="flex items-center gap-1 px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-full">${tag}</span>`).join('') || ''}
                </div>
            </div>

            <div class="border-t border-gray-200 px-5 py-3 text-sm text-gray-500">
                <p>#${issue.id} by ${issue.author || "Unknown"}</p>
                <p>${new Date(issue.createdAt).toLocaleDateString() || ""}</p>
            </div>
        `;
        container.appendChild(div);
    });
};


/// Display closed issues
const displayClose = (issues) => {
    const container = document.getElementById("card");
    const counter = document.getElementById("issueCount");

    container.innerHTML = "";

    const closedIssues = issues.filter(issue => issue.status === "closed");

    counter.textContent = closedIssues.length;

    closedIssues.forEach(issue => {
        
        const div = document.createElement("div");
        div.className = "w-[360px] bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden";

        div.innerHTML = `
            <div class="h-1 bg-purple-500"></div>
            <div class="p-5">
                <div class="flex items-center justify-between mb-4">
                    <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <div class="w-5 h-5 border-2 border-green-500 rounded-full border-dashed"></div>
                    </div>
                    <span class="px-4 py-1 text-sm font-semibold ${
                            issue.priority === "high"
                                ? "text-red-500 bg-red-100"
                                : issue.priority === "medium"
                                ? "text-yellow-500 bg-yellow-100"
                                : "text-gray-500 bg-gray-200"
                        } rounded-full">
                            ${issue.priority || "low"}
                        </span>
                </div>

                <h2 class="text-lg font-semibold text-gray-800 leading-snug mb-2">
                    ${issue.title || "No Title"}
                </h2>

                <p class="text-gray-500 text-sm mb-4">
                    ${issue.description || "No description"}
                </p>

                                                    <!-- Tags -->
                            <div class="flex gap-3 mb-4 flex-wrap">
                                        ${
                                            issue.labels?.map(label => {
                                                let colorClass = "text-gray-500 bg-gray-100";

                                                if (label.toLowerCase() === "bug") {
                                                    colorClass = "text-red-500 bg-red-100";
                                                } 
                                                else if (label.toLowerCase() === "help wanted") {
                                                    colorClass = "text-yellow-500 bg-yellow-100";
                                                } 
                                                else if (label.toLowerCase() === "enhancement") {
                                                    colorClass = "text-green-500 bg-green-100";
                                                }

                                                return `<span class="px-3 py-1 text-sm font-semibold rounded-full ${colorClass}">
                                                            ${label}
                                                        </span>`;
                                            }).join("") || "<span class='text-gray-400'>No labels</span>"
                                        }
                                    </div>
                

                <div class="flex gap-3 mb-4">
                    ${issue.tags?.map(tag => `<span class="flex items-center gap-1 px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-full">${tag}</span>`).join('') || ''}
                </div>
            </div>

            <div class="border-t border-gray-200 px-5 py-3 text-sm text-gray-500">
                <p>#${issue.id} by ${issue.author || "Unknown"}</p>
                <p>${new Date(issue.createdAt).toLocaleDateString() || ""}</p>
            </div>
        `;
        container.appendChild(div);
    });
};



// Button toggle
const buttons = document.querySelectorAll(".filter-btn");
buttons.forEach(btn => {
    btn.addEventListener("click", function() {
        const loadAll = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(json => displayAll(json.data))
        .catch(err => console.error(err));
};

const loadOpen = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(json => displayOpen(json.data))
        .catch(err => console.error(err));
};

const loadClose = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(json => displayClose(json.data))
        .catch(err => console.error(err));
};


        buttons.forEach(b => {
            b.classList.remove("bg-blue-500", "text-white");
            b.classList.add("bg-white", "text-black");
        });
        this.classList.remove("bg-white", "text-black");
        this.classList.add("bg-blue-500", "text-white");

        // Filter functionality (optional for now)
        if(this.id === "all") loadAll();
        else if(this.id === "open") loadOpen();  // later add filtering
        else if(this.id === "closed") loadClose();
    });
});

// Initial load
loadAll();





































