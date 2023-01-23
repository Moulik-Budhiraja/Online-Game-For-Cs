import { CondensedPosition } from '../types/positionTypes';

/**
 * Represents a position in the game
 *
 * @param x The x position of the object
 * @param y The y position of the object
 */
export class Position {
    x: number;
    y: number;
    lastUpdated: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;

        this.lastUpdated = Date.now();
    }

    /**
     * Moves the position to the given x and y
     *
     * @param x The x position to move to
     * @param y The y position to move to
     *
     * @returns The position after moving
     */
    moveTo(x: number, y: number): Position {
        this.x = x;
        this.y = y;

        this.lastUpdated = Date.now();

        return this;
    }

    /**
     * Moves the position by the given x and y
     *
     * @param x The x position to move by
     * @param y The y position to move by
     *
     * @returns The position after moving
     */
    moveBy(x: number, y: number): Position {
        this.x += x;
        this.y += y;

        this.lastUpdated = Date.now();

        return this;
    }

    /**
     * Moves the position by the given velocity
     *
     * @param velocity The velocity to move by
     *
     * @returns The position after moving
     * @see Velocity
     */
    moveByVelocity(velocity: Velocity): Position {
        this.x += velocity.x;
        this.y += velocity.y;

        this.lastUpdated = Date.now();

        return this;
    }

    /**
     * Moves the position towards the given x and y by the given distance
     *
     * @param x The x position to move towards
     * @param y The y position to move towards
     * @param distance The distance to move towards the given x and y
     *
     * @returns The position after moving
     */
    moveToward(x: number, y: number, distance: number): Position {
        let dx = x - this.x;
        let dy = y - this.y;
        let angle = Math.atan2(dy, dx);

        this.x += distance * Math.cos(angle);
        this.y += distance * Math.sin(angle);

        this.lastUpdated = Date.now();

        return this;
    }

    /**
     * Moves the position with the velocity by the delta time from the last update
     * @param velocity The velocity to move by
     * @return The position after moving
     */
    updateByVelocity(velocity: Velocity) {
        let dt = Date.now() - this.lastUpdated;
        this.x += velocity.x * (dt / 1000);
        this.y += velocity.y * (dt / 1000);

        this.lastUpdated = Date.now();

        return this;
    }

    /**
     * Returns the time since the last update in ms
     *
     * @returns The time since the last update in ms
     */
    timeSinceLastUpdate() {
        return Date.now() - this.lastUpdated;
    }

    /**
     * Gets the condensed version of the position
     *
     * @returns The condensed version of the position
     * @see CondensedPosition
     */
    getCondensed(): CondensedPosition {
        return {
            x: this.x,
            y: this.y,
            lastUpdated: this.lastUpdated
        };
    }

    /**
     * Creates a position object from a condensed version of the position
     *
     * @returns A position object from a condensed version of the position
     */
    static fromCondensed(condensedPosition: CondensedPosition) {
        return new Position(condensedPosition.x, condensedPosition.y);
    }
}

export class Velocity {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /**
     * Sets the direction of the velocity
     *
     * @param angle in radians
     * @param speed Speed component of velocity
     */
    setDirection(angle: number, speed: number) {
        this.x = speed * Math.cos(angle);
        this.y = speed * Math.sin(angle);
    }

    /**
     * Gets the speed component of the velocity
     *
     * @returns The speed component of the velocity
     */
    getSpeed() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * Gets the angle component of the velocity
     *
     * @returns The angle component of the velocity
     */
    getAngle() {
        return Math.atan2(this.y, this.x);
    }

    /**
     * Sets the speed component of the velocity
     *
     * @param speed The speed component of the velocity
     * @returns The speed component of the velocity
     */
    setSpeed(speed: number) {
        let angle = this.getAngle();
        this.x = speed * Math.cos(angle);
        this.y = speed * Math.sin(angle);
    }

    /**
     * Sets the angle component of the velocity
     *
     * @param angle The angle component of the velocity
     * @returns The angle component of the velocity
     */
    add(velocity: Velocity) {
        this.x += velocity.x;
        this.y += velocity.y;
    }

    static fromAngle(angle: number, speed: number) {
        angle = (angle * Math.PI) / 180;
        return new Velocity(speed * Math.cos(angle), speed * Math.sin(angle));
    }
}
