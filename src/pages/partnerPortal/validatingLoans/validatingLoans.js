


  async validateThePPPage()
  {
      const loanpalLogoPath = By.xpath('//img[contains(@alt, "Loanpal Logo")]');
      await this.waitForTarget(loanpalLogoPath);
      console.log('PP login successful');
      await this.sleep(200);
  }