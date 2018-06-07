require 'qlab-ruby'
require 'rest-client'

class Listener
  def initialize
    @host = ENV['QLAB_HOST'] || 'localhost'
    @port = ENV['QLAB_PORT'] || 3000
  end
  def start
    puts "Booting Listener instance..."

    @workspace = QLab.connect(@host, @port).workspaces.last
    @allCues = @workspace.cues

    begin
      watch
    rescue SystemExit, Interrupt
      puts "Shutting down Listener instance..."
      exit 0
    rescue Exception => e
      retry
    end
  end

  private

  def sendUpdate(params = {})
    RestClient.post(
      'http://localhost:3000/api/qlab',
      params.to_json,
      { content_type: :json, accept: :json }
    )
  end

  def watch
    loop do
      @workspace.runningOrPausedCues.each_with_index do |cue, index|
        cue = @allCues.find { |c| c.uniqueID == cue['uniqueID'] }

        state = if cue.isRunning
                  'running'
                elsif cue.isPaused
                  'paused'
                else
                  ''
                end

        sendUpdate({
          type: 'cue',
          message: {
            id: cue.number,
            name: cue.listName,
            runningState: state,
            timeRemaining: cue.duration - (cue.duration * cue.percentActionElapsed)
          }
        })

        puts "#{cue.listName} --> Running: #{cue.isRunning}; Remaining: #{cue.duration - (cue.duration * cue.percentActionElapsed)}"
      end

      if @workspace.runningCues.length == 0
        sendUpdate({
          type: 'no_cue',
          message: {}
        })

        puts "No active cues"
      end
    end
  end
end

Listener.new.start
