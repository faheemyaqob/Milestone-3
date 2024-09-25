document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resumeForm');
    const resumeContent = document.getElementById('resumeContent');
    const resumeOutput = document.getElementById('resumeOutput');
    
    // Add experience section
    document.getElementById('addExperience').addEventListener('click', () => {
        const experienceList = document.getElementById('experienceList');
        const newExperience = document.createElement('div');
        newExperience.classList.add('experienceItem');
        newExperience.innerHTML = `
            <label for="expTitle">Job Title:</label>
            <input type="text" class="expTitle" required>
            <label for="expCompany">Company:</label>
            <input type="text" class="expCompany" required>
            <label for="expDates">Dates:</label>
            <input type="text" class="expDates" required>
            <label for="expDesc">Description:</label>
            <textarea class="expDesc" required></textarea>
        `;
        experienceList.appendChild(newExperience);
    });

    // Add education section
    document.getElementById('addEducation').addEventListener('click', () => {
        const educationList = document.getElementById('educationList');
        const newEducation = document.createElement('div');
        newEducation.classList.add('educationItem');
        newEducation.innerHTML = `
            <label for="eduDegree">Degree:</label>
            <input type="text" class="eduDegree" required>
            <label for="eduInstitution">Institution:</label>
            <input type="text" class="eduInstitution" required>
            <label for="eduYear">Year:</label>
            <input type="text" class="eduYear" required>
        `;
        educationList.appendChild(newEducation);
    });

    // Add skill section
    document.getElementById('addSkill').addEventListener('click', () => {
        const skillsList = document.getElementById('skillsList');
        const newSkill = document.createElement('input');
        newSkill.type = 'text';
        newSkill.classList.add('skill');
        newSkill.placeholder = 'Skill';
        skillsList.appendChild(newSkill);
    });

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get input values
        const name = document.getElementById('name').value;
        const tagline = document.getElementById('tagline').value;

        // Get experience data
        const experiences = Array.from(document.querySelectorAll('.experienceItem')).map(item => ({
            title: item.querySelector('.expTitle').value,
            company: item.querySelector('.expCompany').value,
            dates: item.querySelector('.expDates').value,
            description: item.querySelector('.expDesc').value
        }));

        // Get education data
        const educations = Array.from(document.querySelectorAll('.educationItem')).map(item => ({
            degree: item.querySelector('.eduDegree').value,
            institution: item.querySelector('.eduInstitution').value,
            year: item.querySelector('.eduYear').value
        }));

        // Get skills data
        const skills = Array.from(document.querySelectorAll('.skill')).map(skill => skill.value).filter(value => value.trim() !== '');

        // Generate resume content
        resumeContent.innerHTML = `
            <header>
                <h1>${name}</h1>
                <p>${tagline}</p>
            </header>
            <section id="experience">
                <h2>Experience</h2>
                ${experiences.map(exp => `
                    <div>
                        <h3>${exp.title} at ${exp.company}</h3>
                        <p>${exp.dates}</p>
                        <p>${exp.description}</p>
                    </div>
                `).join('')}
            </section>
            <section id="education">
                <h2>Education</h2>
                ${educations.map(edu => `
                    <div>
                        <h3>${edu.degree}</h3>
                        <p>${edu.institution}</p>
                        <p>${edu.year}</p>
                    </div>
                `).join('')}
            </section>
            <section id="skills">
                <h2>Skills</h2>
                <ul>
                    ${skills.map(skill => `<li>${skill}</li>`).join('')}
                </ul>
            </section>
        `;

        resumeOutput.style.display = 'block';
    });

    // Download resume functionality
    document.getElementById('downloadResume').addEventListener('click', () => {
        const blob = new Blob([resumeContent.innerHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resume.html';
        a.click();
        URL.revokeObjectURL(url);
    });
});

