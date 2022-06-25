<template>
  <div>
    <div>
        <div class="side-pane">
            <ul>
                <li>
                    <router-link to="/all-posts">
                        <span> <IconComponent icon="ci:home-alt-minus" /> </span>
                        <span>Home</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/profile">
                        <span> <IconComponent icon="carbon:user-profile" /> </span>
                        <span>Profile</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/messenger">
                        <span> <IconComponent icon="mdi:android-messages" /> </span>
                        <span>Messages</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/notifications">
                        <span> <IconComponent icon="carbon:notification" /> </span>
                        <span>Notifications</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/settings">
                        <span> <IconComponent icon="clarity:settings-line" /> </span>
                        <span>Settings</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/wallet">
                        <span> <IconComponent icon="clarity:wallet-line" /> </span>
                        <span>Wallet</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/nft-market-place">
                        <span> <IconComponent icon="icon-park-outline:weixin-market" /> </span>
                        <span>NFT Marketplace</span>
                        <span class="badge badge-pill badge-danger">Coming Soon</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
  </div>
</template>