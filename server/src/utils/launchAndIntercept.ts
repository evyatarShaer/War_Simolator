import { findMissileByName } from "../service/missileService";
import { getUserByNameService } from "../service/userService";

// פונקציה שמקבלת שם של הטיל של התוקף ושם של המשתמש הנתקף ובודקת
// באילו טילים אפשר ליירט אותו
export const MissilesToIntercept = async (name: string, username: string): Promise<string[]> => {
    const missile = await findMissileByName(name);
    const user = await getUserByNameService(username);

    if (!missile || !user) {
        throw new Error("something went wrong");
    }

    const allMatches: string[] = [];

    for (const miss of user.organization.resources) {
        try {
            const til = await findMissileByName(miss.name);
            if (!til) {
                throw new Error("missile not found");
            } else {
                const filter: string[] = til.intercepts.filter(t => t === miss.name);
                allMatches.push(...filter);
            }
        } catch (e) {
            console.error(e);
        }
    }
    return allMatches;
};
