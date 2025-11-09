const { db } = require('../config/firebase');

exports.check = async (_, res) => {
  return res.status(200).json({ message: "Tasks Routes. Ok" })
}

exports.getTasks = async (_, res) => {

  try {
    const snapshot = await db.collection("tasks").get();
    const tasks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).json({ message: "Tareas:", tasks });
  } catch (err) {
    console.error("Error al obtener las tareas", err);
    res.status(500).json({ message: "Error interno al obtener las tareas" });
  }
};

exports.createTask = async (req, res) => {

  try {
    const { title, description, completed } = req.body;

    if (!title) return res.status(400).json({ messsage: "El titulo es obligatorio" });

    const newTask = {
      title,
      description: description ?? "Sin descripcion",
      completed: completed ?? false,
      createdAt: new Date().toISOString()
    };

    const docRef = await db.collection("tasks").add(newTask);
    res.status(201).json({ id: docRef.id, ...newTask });
  } catch (err) {
    console.error("Fallo al crear una tarea", err);
    res.status(500).json({ message: "Fallo interno al crear la tarea" });
  }
};

exports.updateTask = async (req, res) => {

  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const taskRef = await db.collection("tasks").doc(id);
    const taskDoc = await taskRef.get();

    if (!taskDoc.exists) return res.status(404).json({ message: "Tarea no encontrada" });

    await taskRef.update({
      ...(title && { title }),
      ...(description && { description }),
      ...(completed && { completed }),
      updateAt: new Date().toISOString()
    });

    res.status(200).json({ message: "Tarea actualizada. OK" });
  } catch (err) {
    console.error("Tarea no actualizada");
    res.status(500).json({ message: "Error interno al actualizar la tarea" });
  }
};

exports.deleteTask = async (req, res) => {

  try {
    const { id } = req.params;

    const taskRef = await db.collection("tasks").doc(id);
    const taskDoc = await taskRef.get();

    if (!taskDoc.exists) return res.status(404).json({ message: "Tarea no encontrada" });

    await taskRef.delete();
    res.status(200).json({ message: "Tarea eliminada. OK" });
  } catch (err) {
    console.error("No se ha podido eliminar la tarea");
    res.status(500).json({ message: "Error interno al eliminar la tarea" });
  }
};