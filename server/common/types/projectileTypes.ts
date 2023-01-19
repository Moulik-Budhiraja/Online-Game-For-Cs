export type CondensedProjectile = {
    playerId: string;
    timeCreated: number;
    lifeTime: number;
    pos: {
        x: number;
        y: number;
    };
    vel: {
        x: number;
        y: number;
    };
};