
/* =========================================================
   EMPLOYEE MANAGEMENT DASHBOARD
   COMPLETE JAVASCRIPT
   ========================================================= */


/* =========================================================
   1. SELECT ELEMENTS
   ========================================================= */

const employeeForm = document.querySelector('#employee-form');

const employeeTableBody = document.querySelector(
    '#employees tbody'
);

const employeeModal = document.querySelector(
    '#employee-modal'
);

const openModalButton = document.querySelector(
    '#open-modal'
);

const modalCloseButton = document.querySelector(
    '#employee-modal form button'
);

const totalEmployeesElement = document.querySelector(
    '.dashboard-card:nth-child(1) strong'
);

const activeEmployeesElement = document.querySelector(
    '.dashboard-card:nth-child(2) strong'
);

const reportButton = document.querySelector(
    '#reports button'
);




/* =========================================================
   2. EMPLOYEE DATA
   ========================================================= */

let employees = [
    {
        id: 'EMP001',
        name: 'Rahul Sharma',
        email: 'rahul@example.com',
        department: 'IT',
        position: 'Software Developer',
        status: 'Active'
    },

    {
        id: 'EMP002',
        name: 'Priya Verma',
        email: 'priya@example.com',
        department: 'Human Resources',
        position: 'HR Executive',
        status: 'Active'
    },

    {
        id: 'EMP003',
        name: 'Amit Singh',
        email: 'amit@example.com',
        department: 'Finance',
        position: 'Accountant',
        status: 'Inactive'
    },

    {
        id: 'EMP004',
        name: 'Neha Gupta',
        email: 'neha@example.com',
        department: 'Marketing',
        position: 'Marketing Executive',
        status: 'Active'
    }
];


/* =========================================================
   3. HELPER FUNCTION
   CREATE ELEMENT
   ========================================================= */

function createElement(tag, text = '') {

    const element = document.createElement(tag);

    element.textContent = text;

    return element;
}


/* =========================================================
   4. UPDATE DASHBOARD COUNTS
   ========================================================= */

function updateDashboardCounts() {

    const totalEmployees = employees.length;

    const activeEmployees = employees.filter(
        employee => employee.status === 'Active'
    ).length;

    if (totalEmployeesElement) {

        totalEmployeesElement.textContent =
            totalEmployees;

    }


    if (activeEmployeesElement) {

        activeEmployeesElement.textContent =
            activeEmployees;

    }
}


/* =========================================================
   5. CREATE EMPLOYEE TABLE ROW
   ========================================================= */

function createEmployeeRow(employee) {

    const row = document.createElement('tr');


    /* Employee ID */

    const idCell = createElement(
        'td',
        employee.id
    );


    /* Name */

    const nameCell = createElement(
        'td',
        employee.name
    );


    /* Email */

    const emailCell = createElement(
        'td',
        employee.email
    );


    /* Department */

    const departmentCell = createElement(
        'td',
        employee.department
    );


    /* Position */

    const positionCell = createElement(
        'td',
        employee.position
    );


    /* Status */

    const statusCell = createElement(
        'td',
        employee.status
    );


    /* Actions */

    const actionsCell = document.createElement('td');


    /* View Button */

    const viewButton = createElement(
        'button',
        'View'
    );

    viewButton.type = 'button';

    viewButton.setAttribute(
        'aria-label',
        `View details of ${employee.name}`
    );


    /* Edit Button */

    const editButton = createElement(
        'button',
        'Edit'
    );

    editButton.type = 'button';

    editButton.setAttribute(
        'aria-label',
        `Edit ${employee.name}`
    );


    /* Add buttons */

    actionsCell.appendChild(viewButton);

    actionsCell.appendChild(editButton);


    /* Add cells */

    row.appendChild(idCell);

    row.appendChild(nameCell);

    row.appendChild(emailCell);

    row.appendChild(departmentCell);

    row.appendChild(positionCell);

    row.appendChild(statusCell);

    row.appendChild(actionsCell);


    /* View event */

    viewButton.addEventListener(
        'click',
        () => openEmployeeModal(employee)
    );


    /* Edit event */

    editButton.addEventListener(
        'click',
        () => editEmployee(employee)
    );


    return row;
}


/* =========================================================
   6. RENDER EMPLOYEE TABLE
   ========================================================= */

function renderEmployees() {

    if (!employeeTableBody) {
        return;
    }


    /* Clear existing rows */

    employeeTableBody.innerHTML = '';


    /* Add employees */

    employees.forEach(employee => {

        const row = createEmployeeRow(
            employee
        );

        employeeTableBody.appendChild(row);

    });


    /* Update dashboard */

    updateDashboardCounts();
}


/* =========================================================
   7. GENERATE EMPLOYEE ID
   ========================================================= */

function generateEmployeeId() {

    const nextNumber =
        employees.length + 1;

    return `EMP${String(nextNumber).padStart(3, '0')}`;
}


/* =========================================================
   8. ADD EMPLOYEE
   ========================================================= */

if (employeeForm) {

    employeeForm.addEventListener(
        'submit',
        function (event) {

            event.preventDefault();


            /* Get form values */

            const name =
                document.querySelector(
                    '#employee-name'
                ).value.trim();


            const email =
                document.querySelector(
                    '#employee-email'
                ).value.trim();


            const employeeId =
                document.querySelector(
                    '#employee-id'
                ).value.trim();


            const department =
                document.querySelector(
                    '#department'
                ).value;


            const position =
                document.querySelector(
                    '#position'
                ).value.trim();


            const joiningDate =
                document.querySelector(
                    '#joining-date'
                ).value;


            const statusElement =
                document.querySelector(
                    'input[name="status"]:checked'
                );


            const status =
                statusElement
                    ? statusElement.value
                    : 'active';


            /* Basic validation */

            if (
                !name ||
                !email ||
                !employeeId ||
                !department ||
                !position ||
                !joiningDate
            ) {

                alert(
                    'Please complete all required fields.'
                );

                return;
            }


            /* Check duplicate ID */

            const duplicateId =
                employees.some(
                    employee =>
                        employee.id.toLowerCase() ===
                        employeeId.toLowerCase()
                );


            if (duplicateId) {

                alert(
                    'This Employee ID already exists.'
                );

                return;
            }


            /* Create employee */

            const newEmployee = {

                id: employeeId,

                name: name,

                email: email,

                department:
                    getDepartmentName(department),

                position: position,

                status:
                    status === 'active'
                        ? 'Active'
                        : 'Inactive'

            };


            /* Add employee */

            employees.push(
                newEmployee
            );


            /* Update table */

            renderEmployees();


            /* Reset form */

            employeeForm.reset();


            /* Success message */

            alert(
                `${name} has been added successfully.`
            );


            /* Scroll to employee section */

            document
                .querySelector('#employees')
                .scrollIntoView({
                    behavior: 'smooth'
                });

        }
    );

}


/* =========================================================
   9. DEPARTMENT NAME
   ========================================================= */

function getDepartmentName(value) {

    const departments = {

        it: 'IT',

        hr: 'Human Resources',

        finance: 'Finance',

        marketing: 'Marketing'

    };


    return departments[value] || value;
}


/* =========================================================
   10. OPEN EMPLOYEE MODAL
   ========================================================= */

function openEmployeeModal(employee) {

    if (!employeeModal) {
        return;
    }


    const modalTitle =
        document.querySelector(
            '#modal-title'
        );


    const modalDescription =
        document.querySelector(
            '#modal-description'
        );


    if (modalTitle) {

        modalTitle.textContent =
            `${employee.name} — Employee Details`;

    }


    if (modalDescription) {

        modalDescription.innerHTML = '';


        const description =
            createElement(
                'p',
                'Employee information'
            );


        const details =
            document.createElement('dl');


        const fields = [

            ['Employee ID', employee.id],

            ['Name', employee.name],

            ['Email', employee.email],

            ['Department', employee.department],

            ['Position', employee.position],

            ['Status', employee.status]

        ];


        fields.forEach(
            ([label, value]) => {

                const term =
                    createElement(
                        'dt',
                        label
                    );


                const descriptionValue =
                    createElement(
                        'dd',
                        value
                    );


                details.appendChild(term);

                details.appendChild(
                    descriptionValue
                );

            }
        );


        modalDescription.appendChild(
            description
        );

        modalDescription.appendChild(
            details
        );

    }


    employeeModal.showModal();


    /* Focus close button */

    if (modalCloseButton) {

        modalCloseButton.focus();

    }

}


/* =========================================================
   11. OPEN DEFAULT MODAL
   ========================================================= */

if (openModalButton) {

    openModalButton.addEventListener(
        'click',
        function () {

            if (employees.length > 0) {

                openEmployeeModal(
                    employees[0]
                );

            }

        }
    );

}


/* =========================================================
   12. CLOSE MODAL
   ========================================================= */

if (employeeModal) {

    employeeModal.addEventListener(
        'click',
        function (event) {

            const dialogRect =
                employeeModal.getBoundingClientRect();


            const clickedInside =
                event.clientX >= dialogRect.left &&
                event.clientX <= dialogRect.right &&
                event.clientY >= dialogRect.top &&
                event.clientY <= dialogRect.bottom;


            if (!clickedInside) {

                employeeModal.close();

            }

        }
    );

}


/* =========================================================
   13. EDIT EMPLOYEE
   ========================================================= */

function editEmployee(employee) {

    const newPosition =
        prompt(
            `Edit position for ${employee.name}:`,
            employee.position
        );


    if (
        newPosition === null ||
        newPosition.trim() === ''
    ) {

        return;

    }


    employee.position =
        newPosition.trim();


    renderEmployees();


    alert(
        `${employee.name}'s information has been updated.`
    );

}


/* =========================================================
   14. REPORT BUTTON
   ========================================================= */


if (reportButton) {

    reportButton.addEventListener(
        'click',
        function () {

            const total = employees.length;

            const active = employees.filter(
                employee => employee.status === 'Active'
            ).length;

            const inactive = employees.filter(
                employee => employee.status === 'Inactive'
            ).length;

            alert(
                `Employee Report\n\n` +
                `Total Employees: ${total}\n` +
                `Active Employees: ${active}\n` +
                `Inactive Employees: ${inactive}`
            );

        }
    );

}


/* =========================================================
   15. SETTINGS
   ========================================================= */

const settingsForm = document.querySelector('#settings-form');

if (settingsForm) {

    settingsForm.addEventListener(
        'submit',
        function (event) {

            event.preventDefault();

            const emailNotifications =
                document.querySelector('#email-notifications').checked;

            const systemNotifications =
                document.querySelector('#system-notifications').checked;

            console.log({
                emailNotifications,
                systemNotifications
            });

            alert('Dashboard settings saved successfully.');

        }
    );

}


/* =========================================================
   16. NAVIGATION
   ========================================================= */

const navigationLinks =
    document.querySelectorAll('.sidebar a');

navigationLinks.forEach(link => {

    link.addEventListener('click', function () {

        navigationLinks.forEach(item => {
            item.removeAttribute('aria-current');
        });

        this.setAttribute('aria-current', 'page');

    });

});


/* =========================================================
   17. KEYBOARD ACCESSIBILITY
   ========================================================= */

document.addEventListener('keydown', function (event) {

    if (
        event.key === 'Escape' &&
        employeeModal &&
        employeeModal.open
    ) {

        employeeModal.close();

    }

});


/* =========================================================
   18. INITIALIZE
   ========================================================= */

renderEmployees();

console.log(
    'Employee Management Dashboard loaded successfully.'
);S
