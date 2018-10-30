import { UserIdleConfig } from "angular-user-idle";

/**
 * @desc para cambiar los tiempos de sesión se deben modificar estos parámetros
 * 
 * @param idle Tiempo de sesión establecido
 * @param timeout Tiempo de espera cuando se cumple el {@param idle}
 * @param ping Tiempo establecido para realizar x tareas en un intervalo de tiempo
 * 
 * Es importate saber que el tiempo está establecido en segundos
 * 
 * Fuentes: https://github.com/rednez/angular-user-idle
 */
export const IDLE_CONFIG: UserIdleConfig = {
    idle: 1000, 
    timeout: 5, 
    ping: 5
}