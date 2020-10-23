import firebase from 'firebase';

//configuracao do firebase
const config = {
    apiKey: "AIzaSyDtVC3VQ1Z8XzQYDkWwnTOC_NFo8ny5c90",
    authDomain: "todomanager-5444a.firebaseapp.com",
    databaseURL: "https://todomanager-5444a.firebaseio.com",
    projectId: "todomanager-5444a",
    storageBucket: "todomanager-5444a.appspot.com",
    messagingSenderId: "254572727152"
};
export const initializeFirebaseApi = () => firebase.initializeApp(config);

/**
 * O método createUserOnFirebaseAsync email e password e repassa
 * esses parâmetros p/ o método createUserWithEmailAndPassword da biblioteca do Firebase
 */
export const createUserOnFirebaseAsync = async (email, password) => {
    const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
    return user;
}

export const signInOnFirebaseAsync = async (email, password) => {
    const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
    return user;
}

/**
 *  verificar o estado estado do usuario! Retorna uma promessa indicando qual usuário está autenticado,
 *  mas caso ocorra algum erro, significa que não existe usuário algum autenticado.
 *  Essa verificação é realizada através do método onAuthStateChanged que implementa o padrão Publisher-Subscriber,
 *  ou seja, o método onAuthStateChanged avisa aos seus assinantes sobre qualquer alteração do usuário e para 
 *  receber esse aviso precisamos assinálo.
 *  Então, nós assinamos esse método e quando o mesmo concluí sua execução, cancelamos essa assinatura.
 *  A assinatura do método onAuthStateChanged ocorre quando passamos como parâmetro um observer representado 
 *  pela arrow function (user) => { ... }. O método onAuthStateChanged retorna uma referência dessa assinatura. 
 *  No nosso caso, guardamos a referência dessa assinatura na variável unsubscribe e vamos utilizá-la 
 *  para cancela essa assinatura assim que o método onAuthStateChanged retornar algo.
 */
export const currentFirebaseUser = () => {
    return new Promise((resolve, reject) => {
        var unsubscribe = null;
        unsubscribe = firebase
            .auth()
            .onAuthStateChanged((user) => {
                resolve(user);
            }, (error) => {
                reject(error);
            }, () => {
                unsubscribe();
            });
    });
}

/***
 * O método writeTaskOnFirebase recebe o parâmetro task – que é representado por um json – e repassa esse parâmetro
 * invocando o método update da biblioteca do Firebase. O método nos retorna uma promessa de que a Task será criada,
 * mas caso ocorra algum erro a promessa repassa esse erro. 
 * As Tasks são salvas somente para o usuário corrente, ou seja, cada usuário visualiza somente suas Tasks. 
 * Esse controle é realizado através do método tasksReference.database().ref(user.uid) que 
 * recebe como parâmetro o usuário atual autenticado.
 */
export const writeTaskOnFirebaseAsync = async (task) => {
    const user = await currentFirebaseUser();
    var tasksReference = firebase
        .database()
        .ref(user.uid);
    const key = task.key ?
        task.key :
        tasksReference
            .child('tasks')
            .push()
            .key;
    return await tasksReference
        .child(`tasks/${key}`)
        .update(task);
}

/** O método readTasksFromFirebaseAsync recebe um método como parâmetro. O Firebase tem a inteligência 
 *  de observar qualquer alteração que houver nas Tasks e notificar o método passado como parâmetro. 
 *  Essa notificação é realizada através do método tasksReference.on(...). */
export const readTasksFromFirebaseAsync = async (listener) => {
    const user = await currentFirebaseUser();
    var tasksReference = firebase
        .database()
        .ref(user.uid)
        .child('tasks');
    tasksReference
        .on('value', (snapshot) => {
            var tasks = [];
            snapshot.forEach(function (element) {
                var task = element.val();
                task.key = element.key;
                tasks.push(task);
            });
            listener(tasks);
        });
}