let chatHistory = [];

$(document).ready(function() {
    // Load chat history from memory
    loadHistory();

    // Submit message
    $("#messageArea").on("submit", function(event) {
        event.preventDefault();
        const date = new Date();
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        const str_time = hour + ":" + minute;
        const rawText = $("#text").val();

        if (!rawText.trim()) return;

        const userHtml = '<div class="d-flex justify-content-end mb-4"><div class="msg_cotainer_send">' + 
            rawText + '<span class="msg_time_send">' + str_time + '</span></div>' +
            '<div class="img_cont_msg"><img src="https://i.ibb.co/d5b84Xw/Untitled-design.png" class="rounded-circle user_img_msg"></div></div>';
        
        $("#text").val("");
        $("#messageFormeight").append(userHtml);
        scrollToBottom();

        // Store user message temporarily
        const tempHistory = {
            user: rawText,
            time: str_time,
            timestamp: new Date().toISOString()
        };

        $.ajax({
            data: { msg: rawText },
            type: "POST",
            url: "/get",
        }).done(function(data) {
            const botHtml = '<div class="d-flex justify-content-start mb-4"><div class="img_cont_msg">' +
                '<img src="https://cdn-icons-png.flaticon.com/512/2785/2785482.png" class="rounded-circle user_img_msg"></div>' +
                '<div class="msg_cotainer">' + data + '<span class="msg_time">' + str_time + '</span></div></div>';
            $("#messageFormeight").append($.parseHTML(botHtml));
            scrollToBottom();

            // Add complete conversation to history
            tempHistory.bot = data;
            chatHistory.push(tempHistory);
            saveHistory();
        }).fail(function() {
            const errorHtml = '<div class="d-flex justify-content-start mb-4"><div class="img_cont_msg">' +
                '<img src="https://cdn-icons-png.flaticon.com/512/2785/2785482.png" class="rounded-circle user_img_msg"></div>' +
                '<div class="msg_cotainer">Sorry, I encountered an error. Please try again.<span class="msg_time">' + 
                str_time + '</span></div></div>';
            $("#messageFormeight").append($.parseHTML(errorHtml));
            scrollToBottom();
        });
    });

    // Clear chat
    $("#clear").on("click", function() {
        if (confirm("Are you sure you want to clear the chat?")) {
            $("#messageFormeight").html(
                '<div class="d-flex justify-content-start mb-4">' +
                '<div class="img_cont_msg"><img src="https://cdn-icons-png.flaticon.com/512/2785/2785482.png" class="rounded-circle user_img_msg"></div>' +
                '<div class="msg_cotainer">Hello! I\'m your medical assistant. How can I help you today?<span class="msg_time">Just now</span></div></div>'
            );
        }
    });

    // Toggle history panel
    $("#history").on("click", function() {
        $("#historyPanel").addClass("active");
        $("#overlay").addClass("active");
        displayHistory();
    });

    $("#closeHistory, #overlay").on("click", function() {
        $("#historyPanel").removeClass("active");
        $("#overlay").removeClass("active");
    });

    function scrollToBottom() {
        const msgBody = $("#messageFormeight");
        msgBody.scrollTop(msgBody[0].scrollHeight);
    }

    function saveHistory() {
        // Store in memory (in a real app, you'd save to a database)
        displayHistory();
    }

    function loadHistory() {
        // In a real app, load from database
        displayHistory();
    }

    function displayHistory() {
        const historyContent = $("#historyContent");
        
        if (chatHistory.length === 0) {
            historyContent.html('<div class="no-history">No chat history yet</div>');
            return;
        }

        let historyHtml = '';
        chatHistory.slice().reverse().forEach((item, index) => {
            historyHtml += '<div class="history-item" data-index="' + (chatHistory.length - 1 - index) + '">' +
                '<div class="history-item-user"><i class="fas fa-user"></i> You: ' + item.user + '</div>' +
                '<div class="history-item-bot"><i class="fas fa-robot"></i> Bot: ' + item.bot + '</div>' +
                '<div class="history-item-time"><i class="far fa-clock"></i> ' + item.time + '</div>' +
                '</div>';
        });
        
        historyContent.html(historyHtml);

        // Click history item to view
        $(".history-item").on("click", function() {
            const index = $(this).data("index");
            alert("History item " + (index + 1) + " clicked!\n\nYou: " + chatHistory[index].user + 
                  "\n\nBot: " + chatHistory[index].bot);
        });
    }
});