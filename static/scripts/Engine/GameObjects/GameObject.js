"use strict";

function GameObject(renderableObj) {
    this.mRenderComponent = renderableObj;
    this.mVisible = true;
    this.mCurrentFrontDir = vec2.fromValues(0, 1);  // Current front direction
    this.mSpeed = 0;
}

GameObject.prototype.getXform = function () {
    return this.mRenderComponent.getXform();
};

GameObject.prototype.setVisibility = function (f) {
    this.mVisible = f;
};

GameObject.prototype.isVisible = function () {
    return this.mVisible;
};

GameObject.prototype.setSpeed = function (s) {
    this.mSpeed = s;
};

GameObject.prototype.getSpeed = function () {
    return this.mSpeed;
};

GameObject.prototype.incSpeedBy = function (delta) {
    this.mSpeed += delta;
};

GameObject.prototype.setCurrentFrontDir = function (f) {
    vec2.normalize(this.mCurrentFrontDir, f);
};

GameObject.prototype.getCurrentFrontDir = function () {
    return this.mCurrentFrontDir;
};

GameObject.prototype.getRenderable = function () {
    return this.mRenderComponent;
};

GameObject.prototype.rotateObjPointTo = function (p, rate) {
    // Determine if reaches the destination position p
    var dir = [];

    vec2.sub(dir, p, this.getXform().getPosition());
    var len = vec2.length(dir);

    if (len < Number.MIN_VALUE)
        return; // We are there
    vec2.scale(dir, dir, 1 / len);

    // Compute the angle to rotate
    var fdir = this.getCurrentFrontDir();
    var cosTheta = vec2.dot(dir, fdir);
    if (cosTheta > 0.999999)    // Almost exactly the same direction
        return;

    // Clamp the cosTheta to -1 to 1
    // In a perfect world, this would never happen! BUT ...
    if (cosTheta > 1)
        cosTheta = 1;
    else if (cosTheta < -1)
        cosTheta = -1;

    // Compute whether to rotate clockwise, or counterclockwise
    var dir3d = vec3.fromValues(dir[0], dir[1], 0);
    var f3d = vec3.fromValues(fdir[0], fdir[1], 0);
    var r3d = [];
    vec3.cross(r3d, f3d, dir3d);

    var rad = Math.acos(cosTheta);  // Radian to rotate
    if (r3d[2] < 0)
        rad = -rad;

    // Rotate the facing direction with the angle and rate
    rad *= rate;    // Actual angle needs to rotate from Obj's front
    vec2.rotate(this.getCurrentFrontDir(), this.getCurrentFrontDir(), rad);
    this.getXform().incRotationByRad(rad);
};

GameObject.prototype.update = function () {
    // Simple default behavior
    var pos = this.getXform().getPosition();
    vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.getSpeed());
    //console.log(pos.toString());
};

GameObject.prototype.draw = function (camera) {
    if (this.isVisible())
        this.mRenderComponent.draw(camera);
};

GameObject.prototype.getBBox = function () {
    var xform = this.getXform();
    var b = new BoundingBox(xform.getPosition(), xform.getWidth(), xform.getHeight());
    return b;
};