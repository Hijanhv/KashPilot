// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ERC8004 Agent Identity Standard
 * @dev Implements agent identity and reputation on-chain
 */
contract AgentIdentity {
    struct Agent {
        address agentAddress;
        string agentId;
        uint256 reputationScore;
        uint256 totalTransactions;
        uint256 registeredAt;
        bool isActive;
    }
    
    mapping(address => Agent) public agents;
    mapping(string => address) public agentIdToAddress;
    
    event AgentRegistered(address indexed agentAddress, string agentId, uint256 timestamp);
    event ReputationUpdated(address indexed agentAddress, uint256 newScore);
    event TransactionRecorded(address indexed agentAddress, uint256 count);
    
    function registerAgent(string memory agentId) external {
        require(agents[msg.sender].agentAddress == address(0), "Agent already registered");
        require(agentIdToAddress[agentId] == address(0), "Agent ID already taken");
        
        agents[msg.sender] = Agent({
            agentAddress: msg.sender,
            agentId: agentId,
            reputationScore: 100,
            totalTransactions: 0,
            registeredAt: block.timestamp,
            isActive: true
        });
        
        agentIdToAddress[agentId] = msg.sender;
        
        emit AgentRegistered(msg.sender, agentId, block.timestamp);
    }
    
    function recordTransaction() external {
        require(agents[msg.sender].isActive, "Agent not active");
        
        agents[msg.sender].totalTransactions += 1;
        agents[msg.sender].reputationScore += 1; // Simple reputation increase
        
        emit TransactionRecorded(msg.sender, agents[msg.sender].totalTransactions);
        emit ReputationUpdated(msg.sender, agents[msg.sender].reputationScore);
    }
    
    function getAgentInfo(address agentAddress) external view returns (Agent memory) {
        return agents[agentAddress];
    }
    
    function getAgentByAgentId(string memory agentId) external view returns (Agent memory) {
        address agentAddress = agentIdToAddress[agentId];
        return agents[agentAddress];
    }
}
