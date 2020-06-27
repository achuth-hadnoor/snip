import uid from 'uid-promise'

export const getUser = () => {
    const user = JSON.parse(localStorage.getItem('snipnote'))
    if (user) {
        return user
    }

    const cfg = {
        user: {
            name: '',
            notes: [],
            projects: [{
                id: 'untitled',
                title: 'untitled',
                hex: '#6275ff',
                isSelected: true
            }],
            onboard: false,
            theme: 'dark',
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
    }
    localStorage.setItem('snipnote', JSON.stringify(cfg))
    return cfg;
}

export const updateUser = (user) => {
    user.updatedAt = Date.now();
    return localStorage.setItem('snipnote', JSON.stringify({ user }));
}

export const setNote = ({ title, project, note, checklist, tab = 'Today' }) => {
    return new Promise( (resolve, reject) => {
        if (!title) {
            return reject(new TypeError('title is required'))
        }
        
        const { user } = getUser();
        const id =  uid(20);
        const _note = {
            id,
            title,
            project,
            note,
            checklist,
            completed: false,
            type: tab.toLowerCase(),
            updatedAt: Date.now(),
            createdAt: Date.now(),
        }
        const _notes = [...user.notes, _note];
        user.notes = _notes;
        updateUser(user);
       
        return resolve(user);
    })
}

export const getNote = (_id) => {
    return new Promise((resolve, reject) => {
        const { user } = getUser();
        const {notes} = user;
        const _note = notes.filter(({id})=>id === _id);
         return _note ?  resolve(_note[0]) : reject() 
    })
}

export const updateNote = ({ id, title, note, project, checklist, completed }) => new Promise((resolve) => {
    const { user } = getUser();
    const { notes } = user;
    const newNotes = notes.map((n) => {
        if (n.id === id) {
            n.id = id;
            n.note = note;
            n.project = project;
            n.checklist = checklist;
            n.title = title;
            n.completed = completed;
            n.updatedAt = Date.now();
            return n;
        }

        return n
    });
    user.notes = newNotes;
    updateUser(user);
    return resolve(user);
});

export const removeNote = (_id)=>{
    return new Promise((resolve)=>{
        const {user} = getUser();
        const _notes = user.notes.filter(({id})=> id !== _id );
        user.notes = _notes;
        updateUser(user);
        
        return resolve(user);
    })
}

export const getProject = (Pid) => {
    const { user } = getUser();
    let _project = user.projects.filter(({ id }) => id === Pid);
    if (_project.length === 0) {
        return _project = { id: 'untitled', title: 'untitled', hex: '#6275ff' }
    }
    
    return _project[0];
}

export const setproject = ({ hex }) => {
    return new Promise( (resolve, reject) => { 
        if (!hex) {
            return reject(TypeError('Select Project Color'))
        }
        
        const { user } = getUser();
        const  title  = title.toLowerCase()
        const _project = {
            id: uid(10),
            title,
            hex 
        }
        const _projects = [...user.projects, _project];
        user.projects = _projects;
        updateUser(user);
        return resolve(user);
    })
}

export const removeProject = (id, deleteTasks) => {
    return new Promise((resolve) => {
        const { user } = getUser();
        if (deleteTasks) {
            const _notes = user.notes.filter(({ project }) => project !== id);
            user.notes = _notes;
        }
        
        const projects = user.projects.filter((p) => p.id !== id);
        user.projects = projects;
        updateUser(user);
        resolve(user);
    })
}
