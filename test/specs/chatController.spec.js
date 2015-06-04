var sinon = require('sinon'),
    _ = require('underscore'),
    $ = require('jquery'),
    ChatController = require('../../src/js/controllers/chatController'),
    Conversations = require('../../src/js/collections/conversations'),
    vent = require('../../src/js/vent');

var ClientScenario = require('../scenarios/clientScenario');

describe('ChatController', function() {
    var scenario,
        SupportKit,
        sandbox,
        chatController,
        conversations,
        getConversationSpy,
        initFayeSpy,
        initMessagingBusSpy,
        manageUnreadSpy,
        receiveSpy,
        renderWidgetSpy;

    before(function() {
        scenario = new ClientScenario();
        scenario.build();

        sandbox = sinon.sandbox.create();
    });

    after(function() {
        scenario.clean();
    });

    beforeEach(function(done) {
        conversations = new Conversations();

        chatController = new ChatController({
            collection: conversations
        });

        getConversationSpy = sandbox.spy(chatController, '_getConversation');
        initFayeSpy = sandbox.spy(chatController, '_initFaye');
        initMessagingBusSpy = sandbox.spy(chatController, '_initMessagingBus');
        manageUnreadSpy = sandbox.spy(chatController, '_manageUnread');
        renderWidgetSpy = sandbox.spy(chatController, '_renderWidget');
        receiveSpy = sandbox.spy(chatController, '_receiveMessage');

        chatController.getWidget().then(function() {
            done();
        });
    });

    afterEach(function() {
        sandbox.restore();

        chatController.destroy();
        conversations.reset();
    });

    describe('#getWidget', function() {
        it('should trigger the init chain', function() {
            getConversationSpy.should.have.been.calledOnce;
            initFayeSpy.should.have.been.calledOnce;
            initMessagingBusSpy.should.have.been.calledOnce;
            manageUnreadSpy.should.have.been.calledOnce;
            renderWidgetSpy.should.have.been.calledOnce;
        });
    });


    describe('#sendMessage', function() {
        beforeEach(function(done) {
            chatController.getWidget().then(function() {
                done();
            });
        });

        it('should add a message to the conversation', function() {
            var message = 'Hey!';

            var messages = chatController.conversation.get('messages');
            var initialLength = messages.length;
            chatController.sendMessage(message);
            messages.length.should.equals(initialLength + 1);
            messages.last().get('text').should.equals(message);
        });
    });


    describe('#_receiveMessage', function() {
        beforeEach(function(done) {
            chatController.getWidget().then(function() {
                done();
            });
        });

        it('should add a message to the conversation', function() {

            var message = {
                authorId: 1,
                text: 'Hey!'
            };

            var messages = chatController.conversation.get('messages');
            var initialLength = messages.length;
            chatController._receiveMessage(message);
            messages.length.should.equals(initialLength + 1);
            messages.last().get('text').should.equals(message.text);
        });

    });


    describe('vent', function() {
        var message = {
            authorId: 1,
            text: 'Hey!'
        };

        it('should trigger _receiveMessage', function() {
            vent.trigger('receive:message', message);
            receiveSpy.should.have.been.calledOnce;
            receiveSpy.should.have.been.calledWith(message);
        });
    });

});
