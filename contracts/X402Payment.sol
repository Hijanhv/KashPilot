// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title x402 Payment Protocol
 * @dev Implements x402 payment standard for agent-to-agent payments
 */
contract X402Payment {
    struct Payment {
        address from;
        address to;
        uint256 amount;
        string metadata;
        uint256 timestamp;
        bool completed;
    }
    
    mapping(bytes32 => Payment) public payments;
    mapping(address => uint256) public totalSent;
    mapping(address => uint256) public totalReceived;
    
    event PaymentCreated(bytes32 indexed paymentId, address from, address to, uint256 amount);
    event PaymentCompleted(bytes32 indexed paymentId);
    
    function createPayment(
        address to,
        string memory metadata
    ) external payable returns (bytes32) {
        require(msg.value > 0, "Payment amount must be greater than 0");
        
        bytes32 paymentId = keccak256(abi.encodePacked(
            msg.sender,
            to,
            msg.value,
            block.timestamp
        ));
        
        payments[paymentId] = Payment({
            from: msg.sender,
            to: to,
            amount: msg.value,
            metadata: metadata,
            timestamp: block.timestamp,
            completed: false
        });
        
        totalSent[msg.sender] += msg.value;
        totalReceived[to] += msg.value;
        
        // Execute payment
        (bool success, ) = to.call{value: msg.value}("");
        require(success, "Payment failed");
        
        payments[paymentId].completed = true;
        
        emit PaymentCreated(paymentId, msg.sender, to, msg.value);
        emit PaymentCompleted(paymentId);
        
        return paymentId;
    }
    
    function getPayment(bytes32 paymentId) external view returns (Payment memory) {
        return payments[paymentId];
    }
    
    function getStats(address account) external view returns (uint256 sent, uint256 received) {
        return (totalSent[account], totalReceived[account]);
    }
}
