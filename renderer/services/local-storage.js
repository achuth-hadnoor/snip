import uid from 'uid-promise'

export const getUser = () => {
    const user = JSON.parse(localStorage.getItem('snipsnip'))
    if (user) {
        return user
    }

    const cfg = {
        user: {
            name: '',
            snips: [],
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
    localStorage.setItem('snipsnip', JSON.stringify(cfg))
    return cfg;
}

export const updateUser = (user) => {
    user.updatedAt = Date.now();
    return localStorage.setItem('snipsnip', JSON.stringify({ user }));
}

export const setSnip = ({ title, project, snip, commands, tab = 'Snips' }) => {
    return new Promise( (resolve, reject) => {
        if (!title) {
            return reject(new TypeError('title is required'))
        }
        
        const { user } = getUser();
        const id =  uid(20);
        const _snip = {
            id,
            title,
            project,
            snip,
            commands,
            completed: false,
            type: tab.toLowerCase(),
            updatedAt: Date.now(),
            createdAt: Date.now(),
        }
        const _snips = [...user.snips, _snip];
        user.snips = _snips;
        updateUser(user);
       
        return resolve(user);
    })
}

export const getSnip = (_id) => {
    return new Promise((resolve, reject) => {
        const { user } = getUser();
        const {snips} = user;
        const _snip = snips.filter(({id})=>id === _id);
         return _snip ?  resolve(_snip[0]) : reject() 
    })
}

export const updateSnip = ({ id, title, snip, project, commands, completed }) => new Promise((resolve) => {
    const { user } = getUser();
    const { snips } = user;
    const newsnips = snips.map((n) => {
        if (n.id === id) {
            n.id = id;
            n.snip = snip;
            n.project = project;
            n.commands = commands;
            n.title = title;
            n.completed = completed;
            n.updatedAt = Date.now();
            return n;
        }

        return n
    });
    user.snips = newsnips;
    updateUser(user);
    return resolve(user);
});

export const removesnip = (_id)=>{
    return new Promise((resolve)=>{
        const {user} = getUser();
        const _snips = user.snips.filter(({id})=> id !== _id );
        user.snips = _snips;
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

export const setproject = ({ hex ,title}) => {
    return new Promise( async(resolve, reject) => { 
        if (!hex) {
            return reject(TypeError('Select Project Color'))
        }
        
        const { user } = getUser();
         
        const _project = {
            id: await uid(10),
            title : title.toLowerCase(),
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
            const _snips = user.snips.filter(({ project }) => project !== id);
            user.snips = _snips;
        }
        
        const projects = user.projects.filter((p) => p.id !== id);
        user.projects = projects;
        updateUser(user);
        resolve(user);
    })
}
