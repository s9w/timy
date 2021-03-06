function padInt(num, length) {
    var missingZeros = length-num.toString().length;
    return "0".repeat(missingZeros)+num;
}

var Timy = React.createClass({
    getInitialState() {
        var initialDuration = 3;
        var initialVolume = 50;
        document.getElementById("audioElement").volume = initialVolume/100;
        return {
            durationMinutes: initialDuration,
            timeLeftSec: initialDuration*60,
            volume: initialVolume,
            running: false
        };
    },
    tick: function() {
        this.setState({timeLeftSec: this.state.timeLeftSec - 1});
    },
    start: function() {
        this.interval = setInterval(this.tick, 1000);
        this.setState({running: true});
    },
    stop: function() {
        clearInterval(this.interval);
        this.setState({
            timeLeftSec: this.state.durationMinutes*60,
            running: false
        });
    },
    beep: function(){
        var audioElement = document.getElementById("audioElement");
        audioElement.pause();
        audioElement.currentTime = 0;
        audioElement.play();
    },
    changeDuration: function(event){
        this.setState({
            durationMinutes: event.target.value,
            timeLeftSec: event.target.value*60
        });
    },
    changeVolume: function(event){
        document.getElementById("audioElement").volume = event.target.value/100;
        this.setState({
            volume: event.target.value
        });
    },
    shouldComponentUpdate: function(){
        if(this.state.timeLeftSec === 0){
            this.beep();
            this.stop();
        }
        return true;
    },
    render: function() {
        return (
            <div className="commentBox">
                <h1><a href="https://github.com/s9w/timy">timy</a> (tiny timer)</h1>

                <h2>Duration: {this.state.durationMinutes} Minutes</h2>
                <input type="range" min="1" max="30" step="1"
                       onChange={this.changeDuration}
                       className={this.state.running?"hidden":""}
                       value={this.state.durationMinutes} />

                <h2>Time left: {Math.floor(this.state.timeLeftSec/60)}:{padInt(Math.floor(this.state.timeLeftSec%60),2)}</h2>
                <div>
                    <button onClick={this.start} disabled={this.state.running}>Start</button>
                    <button onClick={this.stop} disabled={!this.state.running}>Stop</button>
                </div>


                <h2>Alarm volume: {this.state.volume}%</h2>
                <input type="range" min="0" max="100" step="1"
                       onChange={this.changeVolume}
                       value={this.state.volume} />

                <div>
                    <button onClick={this.beep}>Test alarm</button>
                </div>
            </div>
        );
    }
});


React.render( <Timy />, document.getElementById('container') );