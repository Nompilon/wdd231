const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];




function highlightCompletedButtons() {
    const buttons = document.querySelectorAll('button[data-subject][data-number]');

    courses.forEach(course => {
        if (course.completed) {
            buttons.forEach(button => {
                const subject = button.getAttribute('data-subject');
                const number = button.getAttribute('data-number');

                if (subject === course.subject && number == course.number) {
                    button.classList.add('completed');
                }
            });
        }
    });


}
highlightCompletedButtons();

function renderCourses(courseList) {
    const container = document.getElementById('course-buttons-container');
    container.innerHTML = ''; // Clear any existing course buttons

    courseList.forEach(course => {
        const div = document.createElement('div');
        const btn = document.createElement('button');
        btn.textContent = `${course.subject} ${course.number}`;
        btn.setAttribute('data-subject', course.subject);
        btn.setAttribute('data-number', course.number);

        if (course.completed) {
            btn.classList.add('completed'); // Add styling class if course is completed
        }

        div.appendChild(btn);
        container.appendChild(div);
    });

    // ✅ Calculate and display total credits for the currently displayed courses
    const totalCredits = courseList.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById('total-credits-display').textContent = `Total credits for the courses listed: ${totalCredits}`;
}

function setupCourseFilters() {
    document.getElementById('all-btn').addEventListener('click', () => {
        renderCourses(courses);
    });

    document.getElementById('cse-btn').addEventListener('click', () => {
        const cseCourses = courses.filter(course => course.subject === 'CSE');
        renderCourses(cseCourses);
    });

    document.getElementById('wdd-btn').addEventListener('click', () => {
        const wddCourses = courses.filter(course => course.subject === 'WDD');
        renderCourses(wddCourses);
    });
}
window.addEventListener('DOMContentLoaded', () => {
    renderCourses(courses);
    setupCourseFilters();
});

