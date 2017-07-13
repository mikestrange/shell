/**
 * Created by MikeRiy on 17/1/4.
 */

function GameScene()
{
    this.player = null;
    this.cursors = null;
    this.platforms = null;
    this.player2 = null;
}

GameScene.prototype =
{
    create:function()
    {
        //  We're going to be using physics, so enable the Arcade Physics system
        this.physics.startSystem(Phaser.Physics.ARCADE);
        //game.physics.setBoundsToWorld();
        //
        this.add.image(0, 0, 'bg');
        //
        this.player = this.create_player(32, 200);
        this.player2 = this.create_player(100,230);
        //
        var fontStyle = { font: "40px Arial", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "left" };
        this.add.text(10, 10, "score:", fontStyle);
        //获取键盘
        this.cursors = this.input.keyboard.createCursorKeys();
        //
        this.platforms = this.add.group();
        this.platforms.enableBody = true;
        //
        var ground = this.platforms.create(0, this.world.height - 64, 'ground');
        ground.body.immovable = true;
        var ledge = this.platforms.create(400, 200, 'ground');
        ledge.body.immovable = true;
        ledge = this.platforms.create(50, 150, 'ground');
        ledge.body.immovable = true;
    },

    create_player:function(x, y)
    {
        var player = this.add.sprite(x, y, 'dude');
        //  We need to enable physics on the player、
        this.physics.arcade.enable(player);
        //  Player physics properties. Give the little guy a slight bounce.
        //player.body.bounce.y = 0;//弹力
        player.body.gravity.y = 200;//重力
        //player.body.collideWorldBounds = true;//限制在世界内部
        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        return player;
    },

    update:function()
    {
        var player = this.player;
        var cursors = this.cursors;
        var platforms = this.platforms;
        player.body.velocity.x = 0;
        //碰撞且效果
        this.physics.arcade.collide(player, platforms);
        this.physics.arcade.collide(this.player2, platforms);
        //
        if (cursors.left.isDown)
        {
            //  Move to the left
            player.body.velocity.x = -100;
            player.animations.play('left');
        } else if (cursors.right.isDown) {
            //  Move to the right
            player.body.velocity.x = 100;
            player.animations.play('right');
        } else {
            //  Stand still
            player.animations.stop();
            player.frame = 4;
        }
        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down )
        {
            player.body.velocity.y = -200;
        }
    }
};