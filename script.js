// Placeholder talk data
const talksData = [
    {
        id: 'talk1',
        title: 'Building Modern Web Applications with React & TypeScript',
        speakers: ['Alice Johnson'],
        categories: ['Web Development', 'Frontend', 'JavaScript'],
        duration: 60,
        description: 'A deep dive into creating robust and scalable web applications using React and TypeScript, covering hooks, state management, and component architecture.'
    },
    {
        id: 'talk2',
        title: 'The Future of AI: From Large Language Models to AGI',
        speakers: ['Dr. Bob Smith', 'Dr. Carol White'],
        categories: ['AI', 'Machine Learning', 'Future Tech'],
        duration: 60,
        description: 'An exploration of current advancements in AI, focusing on LLMs and the roadmap towards Artificial General Intelligence, discussing ethical implications and societal impact.'
    },
    {
        id: 'talk3',
        title: 'Cloud Native Development: Serverless & Kubernetes',
        speakers: ['David Green'],
        categories: ['Cloud', 'DevOps', 'Backend'],
        duration: 60,
        description: 'Understanding the paradigm shift to cloud-native architectures with practical insights into serverless functions, Kubernetes deployments, and container orchestration.'
    },
    {
        id: 'talk4',
        title: 'Securing Your Applications: Best Practices in Cybersecurity',
        speakers: ['Eve Black'],
        categories: ['Security', 'DevSecOps'],
        duration: 60,
        description: 'Essential strategies and tools for protecting your applications from common vulnerabilities, including authentication, authorization, and data encryption.'
    },
    {
        id: 'talk5',
        title: 'Data Science Workflow: From Ingestion to Insights',
        speakers: ['Frank Blue', 'Grace Yellow'],
        categories: ['Data Science', 'Analytics', 'Python'],
        duration: 60,
        description: 'A comprehensive guide through the data science lifecycle, from data collection and cleaning to model building, evaluation, and deriving actionable insights.'
    },
    {
        id: 'talk6',
        title: 'Quantum Computing: Principles and Potential',
        speakers: ['Heidi Purple'],
        categories: ['Emerging Tech', 'Science', 'Physics'],
        duration: 60,
        description: 'An introduction to the fascinating world of quantum computing, covering its fundamental principles, current challenges, and potential to revolutionize various industries.'
    }
];

function calculateSchedule(talks) {
    let currentTime = new Date('2026-03-03T10:00:00'); // Event starts at 10:00 AM
    const schedule = [];
    const talkDuration = 60; // minutes
    const transitionTime = 10; // minutes
    const lunchDuration = 60; // minutes

    for (let i = 0; i < talks.length; i++) {
        const talk = talks[i];

        // Add talk to schedule
        const talkStartTime = new Date(currentTime);
        currentTime.setMinutes(currentTime.getMinutes() + talkDuration);
        const talkEndTime = new Date(currentTime);

        schedule.push({
            ...talk,
            startTime: talkStartTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            endTime: talkEndTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        });

        // Add transition time after each talk, except the last one
        if (i < talks.length - 1) {
            currentTime.setMinutes(currentTime.getMinutes() + transitionTime);
        }

        // Add lunch break after the 3rd talk
        if (i === 2) { // After the 3rd talk (0-indexed)
            const lunchStartTime = new Date(currentTime);
            currentTime.setMinutes(currentTime.getMinutes() + lunchDuration);
            const lunchEndTime = new Date(currentTime);
            schedule.push({
                id: 'lunch',
                title: 'Lunch Break',
                speakers: [],
                categories: ['Break'],
                duration: lunchDuration,
                description: 'Enjoy a delicious lunch and network with fellow attendees!',
                isBreak: true,
                startTime: lunchStartTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                endTime: lunchEndTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
            });
        }
    }
    return schedule;
}

function renderSchedule(talksToRender) {
    const scheduleContainer = document.getElementById('schedule-container');
    scheduleContainer.innerHTML = ''; // Clear previous schedule

    if (talksToRender.length === 0) {
        scheduleContainer.innerHTML = '<p>No talks found for this category.</p>';
        return;
    }

    talksToRender.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('schedule-item');
        itemElement.classList.add(item.isBreak ? 'break' : 'talk');

        const categoriesHtml = item.categories.map(cat => `<span class="category">${cat}</span>`).join('');
        const speakersHtml = item.speakers.length > 0 ? `<p class="speakers">Speakers: ${item.speakers.join(', ')}</p>` : '';

        itemElement.innerHTML = `
            <div class="time">${item.startTime} - ${item.endTime}</div>
            <h3 class="title">${item.title}</h3>
            ${speakersHtml}
            <div class="categories">${categoriesHtml}</div>
            <p class="description">${item.description}</p>
        `;
        scheduleContainer.appendChild(itemElement);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const fullSchedule = calculateSchedule(talksData);
    let currentFilteredSchedule = fullSchedule; // Keep track of the currently filtered schedule

    renderSchedule(fullSchedule);

    const searchInput = document.getElementById('category-search');
    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase().trim();
        if (searchTerm === '') {
            currentFilteredSchedule = fullSchedule;
        } else {
            // Filter both talks and lunch if categories include the search term
            currentFilteredSchedule = fullSchedule.filter(item =>
                item.categories.some(cat => cat.toLowerCase().includes(searchTerm))
            );
        }
        renderSchedule(currentFilteredSchedule);
    });
});
