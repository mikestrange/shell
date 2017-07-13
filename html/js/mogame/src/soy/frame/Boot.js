/**
 * Created by MikeRiy on 17/1/4.
 */
Soy = {
    /* Here we've just got some global level vars that persist regardless of State swaps */
    score: 0,
    /* If the music in your game needs to play through-out a few State swaps, then you could reference it here */
    music: null,
    /* Your game can check MissileCommand.orientated in internal loops to know if it should pause or not */
    orientated: false,
    /* game world*/
    stage: null
};


Soy.world = function(w, h)
{
    if(null == Soy.stage) {
        Soy.stage = new Phaser.Game(640, 480, Phaser.AUTO, 'mygame');
    }
    return Soy.stage;
}

Soy.Boot = function()
{

};

Soy.Boot.prototype = {

    preload: function ()
    {
        this.load.image('preloaderBar', 'res/images/preload.png');
    },

    create: function ()
    {
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;
        //PC
        if (this.game.device.desktop)
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = 320;
            this.scale.minHeight = 240;
            this.scale.maxWidth = 640;
            this.scale.maxHeight = 480;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.screensize = true;
        } else {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = 480;
            this.scale.minHeight = 260;
            this.scale.maxWidth = 1024;
            this.scale.maxHeight = 768;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(true, false);
            this.scale.setResizeCallback(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            this.scale.screensize = true;
        }
        //启动页面
        this.state.start('Preloader');
    },

    gameResized: function (width, height)
    {

    },

    enterIncorrectOrientation: function () {

        Soy.orientated = false;
        //
        document.getElementById('orientation').style.display = 'block';

    },

    leaveIncorrectOrientation: function ()
    {
        Soy.orientated = true;
        //
        document.getElementById('orientation').style.display = 'none';
    }

};
