/**
 * Created by MikeRiy on 17/1/4.
 */

Soy.Preloader = function()
{
    this.background = null;
    this.preloadBar = null;
    this.ready = false;
};

Soy.Preloader.prototype = {
    preload: function ()
    {
        this.preloadBar = this.add.sprite(120, 200, 'preloaderBar');
        this.load.setPreloadSprite(this.preloadBar);
        //加载资源
        this.load.image('titlepage', 'res/images/title-page.png');
        this.load.image('land', 'res/images/land.png');
        this.load.image('marker', 'res/images/marker.png');
        this.load.image('missile', 'res/images/missile.png');
        this.load.image('sky', 'res/images/sky.png');
        this.load.spritesheet('city', 'res/images/city.png', 64, 36);
        //
        this.load.image('bg', 'res/hall_bg.png');
        this.load.image("ground", 'res/rect.png');
        this.load.spritesheet('dude', 'res/player.png', 32, 48);
    },

    create: function ()
    {
        this.preloadBar.cropEnabled = false;
        //主页
        this.state.start('Main');
    },

    update: function ()
    {
        // if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
        // {
        // this.ready = true;
        // this.state.start('MainMenu');
        // }
    }

};
